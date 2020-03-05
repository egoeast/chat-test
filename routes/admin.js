var express = require('express');
var router = express.Router();

/* GET admin home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Admin', user:  req.user});
});

router.get('/users', function(req, res, next) {
    res.render('admin', { title: 'Admin', user:  req.user});
});

router.get('/files', function(req, res, next) {
    res.render('admin', { title: 'Admin', user:  req.user});
});


module.exports = router;
