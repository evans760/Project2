// now we are in localhost:3000/beaches
var express = require('express');
var router = express.Router();

router.get('/:session_id', function(req, res) {
  res.render('sessions/session');
});

module.exports = router;
