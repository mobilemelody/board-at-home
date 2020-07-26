var express = require('express');
var router = express.Router();
const db = require('../db');
const dbUtils = require('../utils/db.js');
var jwt = require('jsonwebtoken');
const secret = "secret"
const bcrypt = require('bcrypt');
const saltRounds = 10;

// router.use(<route>, require(<token middleware>))
router.use('/check', require('../middleware'))

// bcrypt.hash('Password1!', saltRounds, function(err, hash) {
//   console.log(hash)
// });

router.get('/check', function(req, res, next) {
  // Valid token and valid user

  const getUserQuery = {
    text: 'SELECT "User".* FROM "User" WHERE "User".username = $1',
    values: [
      req.headers.from
    ]
  }

  db.client.query(getUserQuery, (err, result) => {
    // return 500 internal error
    if (err) {
      console.log(err)
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
      user: {
        id: result.rows[0].id,
        username: result.rows[0].username,
        email: result.rows[0].email,
      }
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
      console.log(err)
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
      var token = jwt.sign({username: result.rows[0].username}, secret)

      console.log("success")

      return res.status(200).set({
        "Content-Type": "application/json",
      }).send({
        status: 'success',
        user: {
          id: result.rows[0].id,
          username: result.rows[0].username,
          email: result.rows[0].email,
          token: token
        }
      });
    });
  });
});

module.exports = router;
