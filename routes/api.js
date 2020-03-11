var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var HttpError = require('../error/index').HttpError;
var async = require('async');
var Channel = require('../models/channel').Channel;
var Message = require('../models/message').Message;
let UserFile = require('../models/userFile').UserFile;
const fs = require('fs');
const ogs = require('open-graph-scraper');

router.get('/', function (req, res, next) {
    if (req.user) {
        res.send({username: req.user.username, id: req.user._id});
        User.findOne(req.user._id).populate('messages').exec(function (err, files) {
            if (err) return console.log(err);
        })
    } else {
        console.log('without user');
    }
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

});

router.get('/channels', function (req, res, next) {

    Channel.find((err, channels) => {
        if (err) {
            return next(err);
        }
        res.send({status: 200, channels: channels});
    });
});

router.post('/add-channel', function (req, res, next) {
   // console.log(req.body);
    let newChannel = new Channel({name: req.body.name});
    newChannel.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send({status: 200, channel: newChannel});
    });

});

router.post('/upload-file', function (req, res, next) {

    let message = new Message({username: req.user.username, userId: req.user._id, text: req.body.message, channelId: '1', created: Date.now()});
    message.save();

});

router.get('/download-file/:id', function (req, res, next) {
    UserFile.findById(req.params.id, function (err, file) {
        if (!file.path) return HttpError(404, 'Not found');
        let files = fs.createReadStream(file.path);
        res.writeHead(200, {'Content-disposition': 'attachment; filename=' + file.realName}); //here you can add more headers
        files.pipe(res)
    });
});

router.get('/parse-url', function (req, res, next) {
    ogs(
        { url: req.query.url },
        function(er, result) {
            return res.send(result)
        }
    );
});

router.get('/channel-messages', function (req, res, next) {

    let channelId = req.query.id;
    Message.find({channelId : channelId}).populate('attachments').exec(function (err, messages) {
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

//admin
router.get('/admin/all-users', function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
        let users = User.find({}, function (err, users) {
            res.send({status: 200, users: users});
        });
    } else  return HttpError(404, 'Not found');
});

router.get('/admin/all-files', function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
        let files = UserFile.find({}, function (err, files) {
            res.send({status: 200, files: files});
        });
    } else  return HttpError(404, 'Not found');
});


module.exports = router;