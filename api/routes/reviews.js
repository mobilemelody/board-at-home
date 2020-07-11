const express = require('express');
const router = express.Router();
const db = require('../db');

/* Get all reviews */
router.get('/', (req, res) => {
  db.client.query('SELECT * FROM "Review"', (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

/* Get a review */
router.get('/:review_id', (req, res) => {
  let query = {
    text: 'SELECT * FROM "Review" WHERE id = $1',
    values: [req.params.review_id]
  }
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

module.exports = router;