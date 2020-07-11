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

module.exports = router;