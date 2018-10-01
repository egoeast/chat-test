var express = require('express');
var router = express.Router();
const User = require('../models/user').User;
var HttpError = require('../error/index').HttpError;


/* GET users listing. */
router.get('/', function (req, res, next) {

    /* const user = new User({ username: 'user1', password: 'pass' });
     user.save().then((err) => {if(err) throw err});*/
    var users = User.find((err, users) => {
        res.render('users/index', {users: users, title: 'Users',user: null});

    });

});

router.get('/:id', function (req, res, next) {

    let user = User.findById(req.params.id, (err, user) => {
        //if (err) return next(err);
        if (!user) {
            next(new HttpError(418));
        }
        res.render('users/view', {user: user, title: 'User'});
    });

});

module.exports = router;
