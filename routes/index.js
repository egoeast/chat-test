var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
  res.render('index', { title: 'Express', visits:  req.session.numberOfVisits, user: null});
});

module.exports = router;
