var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var HttpError = require('../error/index').HttpError;
var async = require('async');
var Channel = require('../models/channel').Channel;
var Message = require('../models/message').Message;

router.get('/', function (req, res, next) {
    if (req.user) {
        res.send({username: req.user.username, id: req.user._id});
    } else {
        console.log('without user');
    }
    console.log(req.user);
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
        res.send({status: 200, text: 'Welcome!', username: user.username, id: user._id});
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

router.get('/channels', function (req, res, next) {
    /*let newChannel = new Channel({name: 'Test Channel 1'});
    newChannel.save();*/

    Channel.find((err, channels) => {
        if (err) {
            return next(err);
        }
        res.send({status: 200, channels: channels});
    });
});

router.post('/add-channel', function (req, res, next) {
    console.log(req.body);
    let newChannel = new Channel({name: req.body.name});
    newChannel.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({status: 200, channel: newChannel});
    });

});

router.post('/upload-file', function (req, res, next) {
    /*console.log(req.files);
    console.log(req.user);
    console.log(req.body);*/

    let message = new Message({username: req.user.username, userId: req.user._id, text: req.body.message, channelId: '1', created: Date.now()});
    message.save();

    /*let newChannel = new Channel({name: req.body.name});
    newChannel.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({status: 200, channel: newChannel});
    });*/

});



router.get('/channel-messages', function (req, res, next) {
    /*let newChannel = new Channel({name: 'Test Channel 2'});
    newChannel.save();*/

    let channelId = req.query.id;
    Message.find({channelId : channelId}, (err, messages) => {
        if (err) {
            return next(err);
        }
        res.send({status: 200, messages: messages});
    });

});

router.post('/logout', function (req, res, next) {
   req.session.destroy();
   res.send({status: 200, text: 'Logged Out', username: 'Guest'});
});

module.exports = router;