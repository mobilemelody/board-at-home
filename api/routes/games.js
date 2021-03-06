const express = require('express');
const router = express.Router();
const db = require('../db');
const dbUtils = require('../utils/db.js');
const apiUtils = require('../utils/api.js');

const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.BucketRegion,
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});
const S3_BUCKET = process.env.Bucket;

/* Get all games */
router.get('/', (req, res, next) => {
  const getGamesQuery = 'SELECT "Game".*, array_agg("GameCategorySelect".category) as categories FROM "Game"' +
  ' LEFT JOIN "GameCategory" ON "Game".id = "GameCategory"."gameID"' +
  ' LEFT JOIN "GameCategorySelect" ON "GameCategory"."categoryID" = "GameCategorySelect".id' +
  ' GROUP BY "Game".id ORDER BY "Game".id';

  db.client.query(getGamesQuery, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send(result.rows.map(e => apiUtils.formatGame(e)));
  });
});

/* Add a game */
router.post('/', (req, res, next) => {
  let hostname = req.protocol + '://' + req.headers.host;

  // Map form field names to database field names
  const fields = dbUtils.gameFields;

  // Create array of field names for query
  let queryFields = Object.keys(fields).map(e => fields[e]);

  // Validate data received
  if (!("name" in req.body)) {
    let err = { "Error": "The request object is missing the name field" };
    return res.status(400)
      .set({ "Content-Type": "application/json" })
      .send(err);
  }

  // Build query object
  let query = { text: '', values: [] };
  for (let field in fields) {
    query.values.push(req.body[field] || null);
  }

  // Add user details
  queryFields.push('"isUserCreated"');
  query.values.push(true);
  queryFields.push('"identifierID"');
  query.values.push(parseInt(req.headers.from));

  query.text = 'INSERT INTO "Game"(' + queryFields.join(', ') + ') VALUES' + dbUtils.expand(1, queryFields.length) + ' RETURNING *';

  // Run query to add game
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    // Setup return object
    let game = result.rows[0];
    game.url = hostname + '/games/' + game.id;

    // Save categories
    let categories = req.body.categories;
    if (categories) {

      // Build query object
      query.text = 'INSERT INTO "GameCategory"("gameID", "categoryID") VALUES' + dbUtils.expand(categories.length, 2) + ' RETURNING *';
      query.values = [];
      categories.forEach(e => {
        query.values.push(game.id);
        query.values.push(e);
      });

      // Run query to add categories
      db.client.query(query, (err, result) => {
        if (err) {
          return res.status(400).send(err);
        }

        // Add categories to return object
        game.categories = result.rows.map(e => ({
          id: parseInt(e.categoryID),
          url: hostname + '/categories/' + e.categoryID
        }));

        // Send game object
        res.status(201)
          .set({
            "Content-Type": "application/json",
            "Content-Location": game.url
          })
          .send(game);
      });
    }

    // If no categories, send game object with empty category array
    else {
      game.categories = [];
      res.status(201)
        .set({
          "Content-Type": "application/json",
          "Content-Location": game.url
        })
        .send(game);
    }
  });
});

/* Upload game image to S3 */
router.post('/sign-s3', (req, res) => {
  const S3 = new AWS.S3();
  const fileName = Date.now() + '-' + req.body.fileName;
  const fileType = req.body.fileType;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: 'game/' + fileName,
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

/* Get game recommendations */
router.get('/recommendations', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  // Get user ID from request header
  let userID = parseInt(req.headers.from);

  // Build query object
  let query = { 
    text: 'SELECT "Game".*, array_agg(DISTINCT("GameCategorySelect".category)) as categories, SUM("similarUsers"."numGames") AS "score", AVG("gameRatings"."overallRating") AS "avgRating" FROM "Review" LEFT JOIN "Game" ON "Review"."gameID" = "Game".id LEFT JOIN "GameCategory" ON "Game".id = "GameCategory"."gameID" LEFT JOIN "GameCategorySelect" ON "GameCategory"."categoryID" = "GameCategorySelect".id LEFT JOIN ( SELECT "Review"."userID", COUNT(*) AS "numGames" FROM "Review" WHERE "Review"."gameID" IN ( SELECT "Game".id FROM "Game" JOIN "Review" ON "Game".id = "Review"."gameID" WHERE "Review"."userID" = $1 AND "Review"."overallRating" >= 4 ) AND "Review"."overallRating" >= 4 AND "Review"."userID" != $1 GROUP BY "Review"."userID" ORDER BY "numGames" ) AS "similarUsers" ON "Review"."userID" = "similarUsers"."userID" LEFT JOIN (SELECT "gameID", "overallRating" FROM "Review") AS "gameRatings" ON "Review"."gameID" = "gameRatings"."gameID" WHERE "Review"."userID" = "similarUsers"."userID" AND "Review"."gameID" NOT IN ( SELECT "gameID" FROM "Review" WHERE "userID" = $1 ) AND "Review"."overallRating" >= 4 GROUP BY "Game".id ORDER BY "score" DESC',
    values: [userID]
  };

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200)
      .set({
        "Content-Type": "application/json"
      })
      .send(result.rows.map(e => apiUtils.formatGame(e)));
  });

});

/* Get game information by id */
router.get('/:game_id', (req, res) => {
  const query = {
    text: 'SELECT "Game".*, array_agg("GameCategorySelect".category) as categories FROM "Game"' +
      ' LEFT JOIN "GameCategory" ON "Game".id = "GameCategory"."gameID"' +
      ' LEFT JOIN "GameCategorySelect" ON "GameCategory"."categoryID" = "GameCategorySelect".id' +
      ' WHERE "Game".id = $1' +
      ' GROUP BY "Game".id',
    values: [req.params.game_id]
  }

  db.client.query(query, (err, result) => {
    if (err) {
      console.error(`Error querying DB: ${err.message}`);

      return res.status(500).send('Internal server error');
    }

    const game = result.rows[0];

    if (!game) {
      return res.status(404).send('Not found');
    }

    return res.status(200).send(apiUtils.formatGame(game));
  });
});

/* Get reviews for a game */
router.get('/:game_id/reviews', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  let query = {
    text: 'SELECT "Review".*, "User".username, "User"."imgFileName" FROM "Review" INNER JOIN "User" ON "Review"."userID" = "User".id WHERE "Review"."gameID" = $1',
    values: [req.params.game_id]
  }

  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    let reviews = {};
    reviews.results = result.rows.map(e => apiUtils.formatReview(e, hostname));

    res.status(200)
      .set({ "Content-Type": "application/json" })
      .send(reviews);
  });
});

/* Get reviews for a game */
router.get('/:game_id/reviews/average', (req, res) => {

  let query = {
    text: 'SELECT AVG("overallRating")::NUMERIC(10, 1) AS "avgRating" FROM "Review" WHERE "Review"."gameID" = $1',
    values: [req.params.game_id]
  }

  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    var avgRating;

    if (result.rows) {
      avgRating = result.rows[0].avgRating;
    }

    let resp = {
      avgRating: avgRating,
      gameID: parseInt(req.params.game_id),
    };

    res.status(200)
      .set({ "Content-Type": "application/json" })
      .send(resp);
  });
});

/* Get reviews for all games */
router.get('/reviews/average', (req, res) => {

  let query = {
    text: 'SELECT "Game".id as "gameID", AVG("Review"."overallRating")::NUMERIC(10,1) AS "avgRating" FROM "Game"' +
    ' LEFT JOIN "Review" ON "Review"."gameID" = "Game".id' +
    ' GROUP BY "Game".id ORDER BY "Game".id'
  }

  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200)
      .set({ "Content-Type": "application/json" })
      .send(result.rows);
  });
});

/* Create review for game */
router.post('/:game_id/reviews', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  // Map form field names to database field names
  const fields = dbUtils.reviewFields;

  // Create array of field names for query
  let queryFields = Object.keys(fields).map(e => fields[e]);

  // Build query object
  let query = { text: '', values: [] };

  // Add rating values
  for (let field in fields) {
    let val;

    if (field === 'comments') {
      val = req.body[field] || null;
    } else if (field.startsWith('gf')) {
      val = req.body[field] || req.body[field] === 'true';
    } else {
      val = parseInt(req.body[field]) || null;
    }
    query.values.push(val);
  }

  // Add user details
  queryFields.push('"userID"');
  query.values.push(parseInt(req.headers.from));

  // Add game info
  queryFields.push('"gameID"');
  query.values.push(parseInt(req.params.game_id));

  query.text = 'INSERT INTO "Review"(' + queryFields.join(', ') + ') VALUES' + dbUtils.expand(1, queryFields.length)  + ' RETURNING *';

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    let review = apiUtils.formatReview(result.rows[0], hostname);
    res.status(201)
      .set({
        "Content-Type": "application/json",
        "Content-Location": review.url
      })
      .send(review);
  });
});

module.exports = router;
