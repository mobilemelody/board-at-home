const express = require('express');
const router = express.Router();
const db = require('../db');
const dbUtils = require('../utils/db.js');

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});
const S3_BUCKET = process.env.Bucket;

/* Get all games */
router.get('/', (req, res, next) => {
  db.client.query('SELECT * FROM "Game"', (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

/* Add a game */
router.post('/', (req, res, next) => {

  // Map form field names to database field names
  const fields = {
    name: 'name',
    description: 'description',
    image: '"imgFileName"',
    publisher: 'publisher',
    min_players: '"minPlayers"',
    max_players: '"maxPlayers"',
    min_playtime: '"minPlaytime"',
    max_playtime: '"maxPlaytime"',
    year: 'year',
    min_age: '"minAge"',
  };

  // Create array of field names for query
  let query_fields = Object.keys(fields).map(e => fields[e]);

  // Validate data received
  if (!("name" in req.body)) {
    let err = { "Error": "The request object is missing one of the required fields" };
    return res.status(400)
      .set({ "Content-Type": "application/json" })
      .send(err);
  }

  // Build query object
  let query = { text: '', values: [] };
  for (let field in fields) {
    query.values.push(req.body[field] || null);
  }

  // TODO: Add user details
  query_fields.push('"isUserCreated"');
  query.values.push(true);
  query_fields.push('"identifierID"');
  query.values.push("userId");

  query.text = 'INSERT INTO "Game"(' + query_fields.join(', ') + ') VALUES' + dbUtils.expand(1, query_fields.length) + ' RETURNING *';

  // Run query to add game
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    // Setup return object
    let game = result.rows[0];
    let hostname = req.protocol + '://' + req.headers.host;
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
          id: e.categoryID, 
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
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json({ data: {returnData} });
  });
});

module.exports = router;
