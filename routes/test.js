var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('test');
});

router.get('/api/', function(req, res, next) {
    res.send({text: "Hello World!!!"});
});

router.post('/api/', function(req, res, next) {
    let pass = req.body.password;
    let login = req.body.login;
    console.log(pass +','+login);
    res.send({text: "Hello World!!!"});
});


module.exports = router;