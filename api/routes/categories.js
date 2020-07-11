const express = require('express');
const router = express.Router();
const db = require('../db');
const dbUtils = require('../utils/db.js');

/* Get all categories */
router.get('/', (req, res) => {
  db.client.query('SELECT * FROM "GameCategorySelect"', (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

// TODO: Remove once GameCategorySelect table initialization is complete
router.post('/', (req, res) => {
  let categories = [
    "Abstract",
    "Connection",
    "Cooperative",
    "Deduction",
    "Dexterity",
    "Economic",
    "Educational",
    "Fantasy",
    "Farming",
    "Fighting",
    "Finance",
    "Food",
    "Guessing",
    "Historical",
    "Maze",
  ];

  let query = { text: '', values: [] };
  query.text = 'INSERT INTO "GameCategorySelect"(category) VALUES' + dbUtils.expand(categories.length, 1) + ' RETURNING *';
  query.values = categories;

  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });

});

module.exports = router;