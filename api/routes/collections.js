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

  // Get user ID from request header
  let userID = parseInt(req.headers.from);

  // Build query object
  let query = { 
    text: 'INSERT INTO "UserCollection"("userID", name, "isPrivate") VALUES($1, $2, $3) RETURNING *', 
    values: [userID, req.body.name, req.body.isPrivate || false] 
  };

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    let collection = apiUtils.formatCollection(result.rows[0], hostname);
    res.status(201)
      .set({
        "Content-Type": "application/json",
        "Content-Location": collection.url
      })
      .send(collection);
  });

});

/* Get a collection */
router.get('/:collection_id', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  // Build query object
  let query = {
    text: 'SELECT "UserCollection".id AS "collectionID", "UserCollection".name AS "collectionName", "UserCollection"."isPrivate", "User".id AS "userID", "User".username, "User"."imgFileName" AS "userImage", "Game".*, ratings."overallRating" FROM "UserCollection" INNER JOIN "User" ON "User".id = "UserCollection"."userID" LEFT JOIN "CollectionGame" ON "UserCollection".id = "CollectionGame"."userColllectionID" LEFT JOIN "Game" ON "CollectionGame"."gameID" = "Game".id LEFT JOIN (SELECT "gameID", AVG("overallRating") AS "overallRating" FROM "Review" GROUP BY "gameID") ratings ON "Game".id = ratings."gameID" WHERE "UserCollection".id = $1',
    values: [req.params.collection_id]
  }

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else if (!result.rows.length) {
      err = { "Error": "No collection with this id exists" };
      return res.status(404)
        .set({ "Content-Type": "application/json" })
        .send(err);
    }

    let collection = apiUtils.formatCollectionGames(result.rows, hostname);
      res.status(200)
        .set({ "Content-Type": "application/json" })
        .send(collection);
  });

});

/* Update a collection */
router.patch('/:collection_id', (req, res) => {
  let hostname = req.protocol + '://' + req.headers.host;

  let query = { text: '', values: [] };
  let queryFields = [];

  if ("name" in req.body) {
    query.values.push(req.body.name);
    queryFields.push('name = $' + query.values.length);
  }

  if ("isPrivate" in req.body) {
    query.values.push(req.body.isPrivate);
    queryFields.push('"isPrivate" = $' + query.values.length);
  }

  // Check if no valid fields
  if (!queryFields.length) {
    let err = { "Error": "The request object is missing at least one valid field" };
    return res.status(400)
      .set({ "Content-Type": "application/json" })
      .send(err);
  }

  query.values.push(parseInt(req.params.collection_id));
  query.text = 'UPDATE "UserCollection" SET ' + queryFields.join(', ') + ' WHERE id = $' + query.values.length + ' RETURNING *';

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else if (!result.rows.length) {
      err = { "Error": "No collection with this id exists" };
      return res.status(404)
        .set({ "Content-Type": "application/json" })
        .send(err)
    }

    let collection = apiUtils.formatCollection(result.rows[0], hostname);
    res.status(200)
      .set({ 
        "Content-Type": "application/json",
        "Content-Location": collection.url
      })
      .send(collection);
  });

});

/* Add a game to a collection */
router.put('/:collection_id/games/:game_id', (req, res) => {

  // Build query object
  let query = { 
    text: 'INSERT INTO "CollectionGame"("userColllectionID", "gameID") SELECT $1, $2 WHERE NOT EXISTS (SELECT "userColllectionID", "gameID" FROM "CollectionGame" WHERE "userColllectionID" = $1 AND "gameID" = $2) RETURNING *', 
    values: [req.params.collection_id, req.params.game_id] 
  };

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else if (!result.rows.length) {
      err = { "Error": "This game is already part of this collection" };
      return res.status(404)
        .set({ "Content-Type": "application/json" })
        .send(err);
    }

    res.status(204)
      .set({ "Content-Type": "application/json" })
      .send();
  });

});

/* Remove a game from a collection */
router.delete('/:collection_id/games/:game_id', (req, res) => {

  // Build query object
  let query = {
    text: 'DELETE FROM "CollectionGame" WHERE "userColllectionID" = $1 AND "gameID" = $2',
    values: [req.params.collection_id, req.params.game_id]
  }

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else if (result.rowCount == 0) {
      err = { "Error": "This game is not part of this collection" };
      return res.status(404)
        .set({ "Content-Type": "application/json" })
        .send(err);
    }

    res.status(204)
      .set({ "Content-Type": "application/json" })
      .send();
  });

});

/* Delete a collection */
router.delete('/:collection_id', (req, res) => {

  // Build query object
  let query = {
    text: 'DELETE FROM "UserCollection" WHERE id = $1',
    values: [req.params.collection_id]
  }

  // Run query
  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else if (result.rowCount == 0) {
      err = { "Error": "No collection with this id exists" };
      return res.status(404)
        .set({ "Content-Type": "application/json" })
        .send(err);
    }

    res.status(204)
      .set({ "Content-Type": "application/json" })
      .send();
  });

});

module.exports = router;
