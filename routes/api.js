var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var HttpError = require('../error/index').HttpError;
var async = require('async');

router.get('/', function (req, res, next) {
    res.send({user: req.user});
});

router.post('/login', function (req, res, next) {
    let userName = req.body.username;
    let pass = req.body.password;

    async.waterfall([
        (callback) => {
            User.findOne({username: userName}, callback);
        },
        (user, callback) => {
            if (user) {
                if (user.checkPassword(pass)) {
                    callback(null, user)
                }
                else {
                    res.send({status: 403, text: 'Wrong password'});
                    //next(new HttpError(403, "Пароль не верен"))
                }
            } else {
                let newUser = new User({username: userName, password: pass});
                newUser.save((err) => {
                    if(err) return next(err);
                    callback(null, newUser);
                });
            }
        }

    ], (err, user) => {
        if (err) return next(err);
        console.log(err);
        req.session.user = user._id;
        res.send({status: 200, text: 'Ok', username: user.username});
    });
    /*
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
        })*/

});

router.post('/logout', function (req, res, next) {
   req.session.destroy();
   res.send({status: 200, text: 'Logged Out', username: 'Guest'});
});

module.exports = router;