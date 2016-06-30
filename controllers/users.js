// now we are in localhost:3000/beaches
var express = require('express');
var router = express.Router();

router.get('/:user_id', function(req, res) {
  res.render('users/user');
});

module.exports = router;
