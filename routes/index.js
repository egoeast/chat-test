var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log('user: ' + req.user);
  //res.render('index', { title: 'Express', user:  req.user});
    res.send('Hello World!');
});

module.exports = router;
