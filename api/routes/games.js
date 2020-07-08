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
    res.status(200).send(result.rows[0]);
    // TODO: Save categories
  });

});

/* Upload game image to S3 */
router.post('/sign-s3', (req, res) => {
  const S3 = new AWS.S3();
  const fileName = req.body.fileName;
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
