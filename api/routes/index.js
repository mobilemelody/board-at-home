const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (process.env.NODE_ENV === 'dockerlocal') {
    return res.redirect('http://localhost:8080');
  }
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

module.exports = router;
