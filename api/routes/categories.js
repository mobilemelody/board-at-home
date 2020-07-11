const express = require('express');
const router = express.Router();
const db = require('../db');

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
  query.text = 'INSERT INTO "GameCategorySelect"(category) VALUES' + expand(categories.length, 1) + ' RETURNING *';
  query.values = categories;

  db.client.query(query, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });

});

// expand(3, 2) returns "($1, $2), ($3, $4), ($5, $6)" 
function expand(rowCount, columnCount, startAt=1){
  var index = startAt
  return Array(rowCount).fill(0).map(v => `(${Array(columnCount).fill(0).map(v => `$${index++}`).join(", ")})`).join(", ")
}

module.exports = router;