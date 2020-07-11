const express = require('express');
const router = express.Router();
const db = require('../db');

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
    return res.status(400).send(err);
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

  query.text = 'INSERT INTO "Game"(' + query_fields.join(', ') + ') VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    let game_id = result.rows[0].id;

    // Save categories
    let categories = req.body.categories;
    if (categories) {
      query.text = 'INSERT INTO "GameCategory"("gameID", "categoryID") VALUES' + expand(categories.length, 2) + ' RETURNING *';
      query.values = [];
      categories.forEach(e => {
        query.values.push(game_id);
        query.values.push(e);
      });

      db.client.query(query, (err, result) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    } else {
      res.status(200).send(result.rows);
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

// expand(3, 2) returns "($1, $2), ($3, $4), ($5, $6)" 
function expand(rowCount, columnCount, startAt=1){
  var index = startAt
  return Array(rowCount).fill(0).map(v => `(${Array(columnCount).fill(0).map(v => `$${index++}`).join(", ")})`).join(", ")
}

module.exports = router;
