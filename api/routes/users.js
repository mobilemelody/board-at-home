const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  const getUserDataQuery = 'SELECT * FROM "User" WHERE "User".id = $1';

  const query = {
    text: getUserDataQuery,
    values: [req.params.id]
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

router.get('/:id/collections', (req, res, next) => {
  const getUserCollectionsQuery = 'SELECT DISTINCT ON("UserCollection"."id") "Game"."imgFileName" as coverimg, "UserCollection".*' +
    ' FROM "UserCollection"' +
    ' JOIN "CollectionGame" ON "CollectionGame"."userColllectionID" = "UserCollection".id' +
    ' JOIN "Game" ON "CollectionGame"."gameID" = "Game".id' +
    ' WHERE "UserCollection"."userID" = $1' +
    ' ORDER BY "UserCollection".id ASC';

  const query = {
    text: getUserCollectionsQuery,
    values: [req.params.id]
  };

  db.client.query(query, (err, result) => {
    if (err) {
      console.error(`Error querying user collections: ${err.message}`);

      return res.status(500).send('Internal server error');
    }

    const collections = result.rows;

    if (!collections || collections.length < 1) {
      return res.status(404).send('Not found');
    }

    return res.status(200).send(collections);
  });
});

module.exports = router;
