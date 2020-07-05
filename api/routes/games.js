const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});
const S3_BUCKET = process.env.Bucket;

/* Add a game */
router.post('/', (req, res, next) => {
  const fields = ["name", "description", "image", "publisher", "min_players", "max_players", "min_playtime", "max_playtime", "year", "min_age"];

  // Validate data received
  if (!("name" in req.body)) {
    let err = { "Error": "The request object is missing one of the required fields" };
    return res.status(400).send(err);
  }

  // Build query object
  let query = { text: '', values: [] };
  fields.forEach(field => {
    query.values.push(req.body[field] || null);
  });
  query.text = 'INSERT INTO games(' + fields.join(', ') + ') VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';

  // TODO: Run query
  res.status(201).send(query);

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
