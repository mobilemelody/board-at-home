const express = require('express');
const router = express.Router();
const db = require('../db');
const apiUtils = require('../utils/api.js');

/* Get all reviews */
router.get('/', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;
  db.client.query('SELECT * FROM "Review"', (err, result) => {
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

/* Get a review */
router.get('/:review_id', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  let query = {
    text: 'SELECT * FROM "Review" WHERE id = $1',
    values: [req.params.review_id]
  }

  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    if (result.rows.length) { 
      let review = apiUtils.formatReview(result.rows[0], hostname);

      res.status(200)
        .set({ "Content-Type": "application/json" })
        .send(review);
    } else {
      err = { "Error": "No review with this id exists" };
      res.status(404)
        .set({ "Content-Type": "application/json" })
        .send(err);
    }
  });
});

module.exports = router;