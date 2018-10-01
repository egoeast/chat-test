var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var HttpError = require('../error/index').HttpError;

/* GET login page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Express', user: null});
});
router.post('/', function (req, res, next) {
    User.findOne({username: req.body.username}, (err, user) => {
        if(err) return next(err);
        if (user) {
            if (user.checkPassword(req.body.password)) {
                res.render('login', {title: 'Express', user: user});
            } else {
                next(new HttpError(404))
            }
        } else {
            next(new HttpError(418))
        }
    })

});


module.exports = router;