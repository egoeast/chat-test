var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', visits:  req.session.numberOfVisits, user: null});
});

router.get('/test', function(req, res, next) {
    res.render('test', { title: 'Express', user: null});
});

module.exports = router;
