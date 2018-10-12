var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var HttpError = require('../error/index').HttpError;
var async = require('async');

/* GET login page. */
router.get('/', function (req, res, next) {
    //res.redirect('/');
    res.render('index', {title: 'Express', user: null});
});
/*
router.post('/', function (req, res, next) {
    let userName = req.body.username;
    let pass = req.body.password;

    async.waterfall([
        function (callback) {
            User.findOne({username: userName}, callback);
        },
        function (user, callback) {
            if (user) {
                if (user.checkPassword(pass)) {
                    res.send({});
                    callback(null, user)
                }
                else {
                    next(new HttpError(403, "Пароль не верен"))
                }
            } else {
                let newUser = new User({username: userName, password: pass});
                newUser.save();
            }
        },

    ]);
/!*
    User.findOne({username: userName}, (err, user) => {
        if(err) return next(err);
        if (user) {
            if (user.checkPassword(pass)) {
                res.render('login', {title: 'Express', user: user});
            } else {
                next(new HttpError(404))
            }
        } else {
            let newUser = new User(userName, pass);
            user.save();
        }
    })*!/

});
*/


module.exports = router;