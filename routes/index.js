var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('ITE-490 Final Project');
});

module.exports = router;
