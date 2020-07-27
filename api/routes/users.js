const express = require('express');
const router = express.Router();
const db = require('../db');
const apiUtils = require('../utils/api');

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

/* Get user collections */
router.get('/:user_id/collections', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  let query = {
    text: 'SELECT "UserCollection".*, COALESCE(games.n, 0) AS "gameCount" FROM "UserCollection" LEFT JOIN (SELECT "userColllectionID", COUNT(*) AS n FROM "CollectionGame" GROUP BY "CollectionGame"."userColllectionID") games ON "UserCollection".id = games."userColllectionID" WHERE "UserCollection"."userID" = $1',
    values: [req.params.id]
  }

  // Add game filter if needed
  if ("gameID" in req.query) {
    query.text += ' AND "UserCollection".id IN (SELECT "userColllectionID" FROM "CollectionGame" WHERE "gameID" = $2)';
    query.values.push(req.query.gameID);
  }

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else if (!result.rows.length) {
      err = { "Error": "This user does not have any collections" };
      err.Error += "gameID" in req.query ? ' with this game' : '';
      return res.status(404)
        .set({ "Content-Type": "application/json" })
        .send(err);
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

module.exports = router;
