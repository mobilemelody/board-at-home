const express = require('express');
const router = express.Router();
const db = require('../db');
const dbUtils = require('../utils/db.js');
const apiUtils = require('../utils/api.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { query } = require('express');
const saltRounds = 10;
const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.BucketRegion,
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});
const S3_BUCKET = process.env.Bucket;

// router.use(<route>, require(<token middleware>))
router.use('/check', require('../middleware'))

router.get('/check', function(req, res) {
  // Valid token and valid user

  const getUserQuery = {
    text: 'SELECT "User".* FROM "User" WHERE "User".id = $1',
    values: [
      parseInt(req.headers.from)
    ]
  }

  db.client.query(getUserQuery, (err, result) => {
    // return 500 internal error
    if (err) {
      return res.status(500).set({
        "Content-Type": "application/json",
      }).send({
        status: 'fail',
        message: err
      })
    }

    // If user found
    if (!result.rows[0]) {
      return res.status(400).set({
        "Content-Type": "application/json",
      }).send({
        status: 'error',
        message: 'No user found with credentials'
      })
    }

    return res.status(200).set({
      "Content-Type": "application/json",
    }).send({
      status: 'success',
      id: result.rows[0].id,
      username: result.rows[0].username,
      email: result.rows[0].email,
      imgFileName: result.rows[0].imgFileName,
    });
  });
});


/* GET users listing. */
router.post('/login', function(req, res, next) {

  // Check for username and password in req.body
  if (req.body.username == null || req.body.password == null) {
    return res.status(400).set({
      "Content-Type": "application/json",
    }).send({
      status: 'error',
      message: 'username and password must be provided'
    })
  }

  // Create array of field names for query
  const getUserQuery = {
    text: 'SELECT "User".* FROM "User" WHERE "User".username = $1',
    values: [
      req.body.username
    ]
  }


  db.client.query(getUserQuery, (err, result) => {
    // return 500 internal error
    if (err) {
      return res.status(500).set({
        "Content-Type": "application/json",
      }).send({
        status: 'fail',
        message: err
      })
    }

    // If user found
    if (!result.rows[0]) {
      return res.status(400).set({
        "Content-Type": "application/json",
      }).send({
        status: 'error',
        message: 'No user found with credentials'
      })
    }
    // compare plain text password with hashed query result
    bcrypt.compare(req.body.password, result.rows[0].password, function(err, isMatch) {
      // If not match
      if (!isMatch) {
        return res.status(400).set({
          "Content-Type": "application/json",
        }).send({
          status: 'error',
          message: err
        });
      }

      // Create token with username
      const token = jwt.sign({id: result.rows[0].id}, process.env.PrivateKey)

      return res.status(200).set({
        "Content-Type": "application/json",
      }).send({
        status: 'success',
        id: result.rows[0].id,
        username: result.rows[0].username,
        email: result.rows[0].email,
        imgFileName: result.rows[0].imgFileName,
        token
      });
    });
  });
});

/* GET users listing. */
router.get('/:user_id', (req, res, next) => {
  const getUserDataQuery = 'SELECT * FROM "User" WHERE "User".id = $1';

  const query = {
    text: getUserDataQuery,
    values: [req.params.user_id]
  }

  db.client.query(query, (err, result) => {
    if (err) {
      console.error(`Error querying user profile: ${err.message}`);

      return res.status(500).send('Internal server error');
    }

    if (!result.rows[0]) {
      return res.status(404).send('Not found');
    }

    // Remove password from userData that we return to UI
    const { password, ...userData } = result.rows[0];

    return res.status(200).send(userData);
  });
});

router.put('/:user_id', (req, res) => {
  const { username, password, email, imgFileName } = req.body;
  let queryFields = [];

  let updateQuery = {
    values: [req.params.user_id],
  };

  if (username) {
    updateQuery.values.push(username);
    queryFields.push(`username = $${updateQuery.values.length}`);
  }

  if (email) {
    updateQuery.values.push(email);
    queryFields.push(`email = $${updateQuery.values.length}`);
  }

  if (imgFileName) {
    updateQuery.values.push(imgFileName);
    queryFields.push(`"imgFileName" = $${updateQuery.values.length}`);
  }

  // Password is added last as we need to asynchronously hash the password and then use the value
  // to change the user's password
  if (password) {
    bcrypt.hash(password, saltRounds, (err, passwordHash) => {
      if (err) {
        console.error('Unable to hash password');
        return res.status(500).set({
          "Content-Type": "application/json",
        }).send({
          status: 'fail',
          message: err,
        });
      }
      updateQuery.values.push(passwordHash);
      queryFields.push(`password = $${updateQuery.values.length}`);

      updateQuery.text = `UPDATE "User" SET ${queryFields.join(' ,')} WHERE id = $1 RETURNING *`;

      db.client.query(updateQuery, (err, result) => {
        if (err) {
          console.error('Unable to query database');
          return res.status(500).set({
            "Content-Type": "application/json",
          }).send({
            status: 'fail',
            message: err
          });
        }

        return res.status(200).set({
          "Content-Type": "application/json",
        }).send(apiUtils.formatUser(result.rows[0]));
      });
    });
  } else {
    // Regular update query without hashed password
    updateQuery.text = `UPDATE "User" SET ${queryFields.join(' ,')} WHERE id = $1 RETURNING *`;

    db.client.query(updateQuery, (err, result) => {
      if (err) {
        console.error('Unable to query database');
        return res.status(500).set({
          "Content-Type": "application/json",
        }).send({
          status: 'fail',
          message: err
        });
      }

      return res.status(200).set({
        "Content-Type": "application/json",
      }).send(apiUtils.formatUser(result.rows[0]));
    });
  }
});

/* Get user collections */
router.get('/:user_id/collections', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  let query = {
    text: 'SELECT "UserCollection".*, "gameIDs", COALESCE(games.n, 0) AS "gameCount" FROM "UserCollection" LEFT JOIN (SELECT "userColllectionID", array_agg("CollectionGame"."gameID") as "gameIDs", COUNT(*) AS n FROM "CollectionGame" GROUP BY "CollectionGame"."userColllectionID") games ON "UserCollection".id = games."userColllectionID" WHERE "UserCollection"."userID" = $1',
    values: [req.params.user_id]
  }

  // Add game filter if needed
  if ("gameID" in req.query) {
    query.text += ' AND "UserCollection".id IN (SELECT "userColllectionID" FROM "CollectionGame" WHERE "gameID" = $2)';
    query.values.push(req.query.gameID);
  }

  query.text += ' ORDER BY "UserCollection".id';

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    let response = {};
    response.collections = result.rows.map(e => apiUtils.formatCollection(e, hostname));

    res.status(200)
      .set({ "Content-Type": "application/json" })
      .send(response);
  });
});

router.get('/:user_id/reviews', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  const reviewsQuery = 'SELECT "Review".id, "Review"."overallRating", "Review".comments, "Game".name FROM "Review"'
   + ' JOIN "User" ON "Review"."userID" = "User".id'
   + ' JOIN "Game" ON "Review"."gameID" = "Game".id'
   + ' WHERE "User".id = $1 AND "Review"."overallRating" IS NOT NULL';

  const query = {
    text: reviewsQuery,
    values: [req.params.user_id]
  }

  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    const response = {};
    response.reviews = result.rows.map(data => apiUtils.formatReview(data, hostname));

    res.status(200)
      .set({ "Content-Type": "application/json" })
      .send(response);
  });
});

router.post('/signup', function(req, res) {
  // Check for username and password in req.body
  if (req.body.username == null || req.body.password == null || req.body.email == null) {
    return res.status(400).set({
      "Content-Type": "application/json",
    }).send({
      status: 'error',
      message: 'username, email, and password must be provided'
    })
  }

  // hash password
  bcrypt.hash(req.body.password, saltRounds, function(err, passwordHash) {
    if (err) {
      return res.status(500).set({
        "Content-Type": "application/json",
      }).send({
        status: 'fail',
        message: err
      })
    }

    // Create query
    const insertUserQuery = {
      text: 'INSERT INTO "User"(username, email, password) VALUES($1, $2, $3)',
      values: [
        req.body.username,
        req.body.email,
        passwordHash
      ]
    }

    // Run insert user query
    db.client.query(insertUserQuery, (err, result) => {
      // return 500 internal error
      if (err) {
        return res.status(500).set({
          "Content-Type": "application/json",
        }).send({
          status: 'fail',
          message: err
        })
      }

      return res.status(200).set({
        "Content-Type": "application/json",
      }).send({
        status: 'success',
      });
    });
  });
});

/* Upload game image to S3 */
router.post('/image-s3', (req, res) => {
  const S3 = new AWS.S3();
  const fileName = Date.now() + '-' + req.body.fileName;
  const fileType = req.body.fileType;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: 'user/' + fileName,
    ContentType: fileType,
    ACL: 'public-read',
  };

  S3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${s3Params.Key}`
    };
    res.json({ data: {returnData} });
  });
});



module.exports = router;
