const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  const getUserDataQuery = 'SELECT * FROM "User"' +
  ' WHERE "User".id = $1';

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

module.exports = router;
