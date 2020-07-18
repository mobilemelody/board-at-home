const express = require('express');
const router = express.Router();
const db = require('../db');
const apiUtils = require('../utils/api.js');

/* Get all reviews */
router.get('/', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;
  db.client.query('SELECT "Review".*, "User".username, "User"."imgFileName" FROM "Review" INNER JOIN "User" ON "Review"."userID" = "User".id', (err, result) => {
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
    text: 'SELECT "Review".*, "User".username, "User"."imgFileName" FROM "Review" INNER JOIN "User" ON "Review"."userID" = "User".id WHERE "Review".id = $1',
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

/* Update a review */
router.patch('/:review_id', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  // Map form field names to database field names
  const fields = {
    overallRating: '"overallRating"',
    comments: 'comments',
    strategy: '"strategy"',
    luck: '"luck"',
    playerInteraction: '"playerInteraction"',
    replayValue: '"replayValue"',
    complexity: '"complexity"',
    gfKids: '"gfKids"',
    gfTeens: '"gfTeens"',
    gfAdults: '"gfAdults"',
    gfFamilies: '"gfFamilies"',
    gf2Player: '"gf2Player"',
    gfLargeGroups: '"gfLargeGroups"',
    gfSocialDistancing: '"gfSocialDistancing"'
  };

  // Create array of field names for query
  let query_fields = [];

  // Build query object
  let query = { text: '', values: [] };

  // Add rating values
  for (let field in req.body) {

    // Check that field is valid
    if (field in fields) {

      if (field === 'comments') {
        val = req.body[field];
      } else if (field.startsWith('gf')) {
        val = req.body[field] || req.body[field] === 'true';
      } else {
        val = parseInt(req.body[field]);
      }

      query.values.push(val);
      query_fields.push(fields[field] + ' = $' + query.values.length);
    }
  }

  // Check if no valid fields
  if (!query_fields.length) {
    let err = { "Error": "The request object is missing at least one valid field" };
    return res.status(400)
      .set({ "Content-Type": "application/json" })
      .send(err);
  }

  query.values.push(parseInt(req.params.review_id));
  query.text = 'UPDATE "Review" SET ' + query_fields.join(', ') + ' WHERE id = $' + query.values.length + ' RETURNING *';

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else if (!result.rows.length) {
      err = { "Error": "No review with this id exists" };
      return res.status(404)
        .set({ "Content-Type": "application/json" })
        .send(err)
    }

    let review = apiUtils.formatReview(result.rows[0], hostname);
    res.status(200)
      .set({ 
        "Content-Type": "application/json",
        "Content-Location": review.url
      })
      .send(review);
  });

});

/* Delete a review */
router.delete('/:review_id', (req, res) => {

  // Create query object
  let query = {
    text: 'DELETE FROM "Review" WHERE id = $1',
    values: [req.params.review_id]
  }

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else if (result.rowCount == 0) {
      err = { "Error": "No review with this id exists" };
      return res.status(404)
        .set({ "Content-Type": "application/json" })
        .send(err)
    }

    res.status(204)
      .set({ "Content-Type": "application/json" })
      .send();
  });


});

module.exports = router;