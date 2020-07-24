const express = require('express');
const router = express.Router();
const db = require('../db');
const dbUtils = require('../utils/db.js');
const apiUtils = require('../utils/api.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).send({message: 'suhh dude'});
});

/* Get user collections */
router.get('/:user_id/collections', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  let query = {
    text: 'SELECT "UserCollection".*, COALESCE(games.n, 0) AS "gameCount" FROM "UserCollection" LEFT JOIN (SELECT "userColllectionID", COUNT(*) AS n FROM "CollectionGame" GROUP BY "CollectionGame"."userColllectionID") games ON "UserCollection".id = games."userColllectionID" WHERE "UserCollection"."userID" = $1',
    values: [req.params.user_id]
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

    let collections = {};
      collections.collections = result.rows.map(e => apiUtils.formatCollection(e, hostname));

      res.status(200)
        .set({ "Content-Type": "application/json" })
        .send(collections);
  });

});

module.exports = router;
