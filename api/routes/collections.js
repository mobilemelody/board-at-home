const express = require('express');
const router = express.Router();
const db = require('../db');
const dbUtils = require('../utils/db.js');
const apiUtils = require('../utils/api.js');

/* Create a collection */
router.post('/', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  // Validate data received
  if (!("name" in req.body)) {
    let err = { "Error": "The request object is missing the name field" };
    return res.status(400)
      .set({ "Content-Type": "application/json" })
      .send(err);
  }

  // Build query object
  let query = { 
    text: 'INSERT INTO "UserCollection"("userID", name, "isPrivate") VALUES($1, $2, $3) RETURNING *', 
    values: [] 
  };

  // TODO: Add user ID
  query.values.push(1);
  query.values.push(req.body.name);
  query.values.push(req.body.isPrivate || false);

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(201)
      .set({
        "Content-Type": "application/json",
        "Content-Location": ""
      })
      .send(apiUtils.formatCollection(result.rows[0], hostname));
  });

});

/* Get a collection */
router.get('/:collection_id', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  let query = {
    text: 'SELECT "UserCollection".id AS "collectionID", "UserCollection".name AS "collectionName", "UserCollection"."isPrivate", "User".id AS "userID", "User".username, "User"."imgFileName" AS "userImage", "Game".* FROM "UserCollection" INNER JOIN "User" ON "User".id = "UserCollection"."userID" LEFT JOIN "CollectionGame" ON "UserCollection".id = "CollectionGame"."userColllectionID" LEFT JOIN "Game" ON "CollectionGame"."gameID" = "Game".id WHERE "UserCollection".id = $1',
    values: [req.params.collection_id]
  }

  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    if (result.rows.length) { 
      let collection = apiUtils.formatCollectionGames(result.rows, hostname);

      res.status(200)
        .set({ "Content-Type": "application/json" })
        .send(collection);
    } else {
      err = { "Error": "No collection with this id exists" };
      res.status(404)
        .set({ "Content-Type": "application/json" })
        .send(err);
    }
  });
});

/* Add a game to a collection */
router.put('/:collection_id', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  // Validate data received
  // TODO: Check that game exists and is not already in collection
  if (!("gameID" in req.body)) {
    let err = { "Error": "The request object is missing the gameID field" };
    return res.status(400)
      .set({ "Content-Type": "application/json" })
      .send(err);
  }

  // Build query object
  let query = { 
    text: 'INSERT INTO "CollectionGame"("userColllectionID", "gameID") VALUES($1, $2) RETURNING *', 
    values: [req.params.collection_id, req.body.gameID] 
  };

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(204)
      .set({ "Content-Type": "application/json" })
      .send();
  });
});

module.exports = router;
