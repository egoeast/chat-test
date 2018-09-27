var express = require('express');
var router = express.Router();
const User = require('../models/user').User;

/* GET users listing. */
router.get('/', function(req, res, next) {

    /*const user = new User({ username: 'user1', password: 'pass' });
    user.save().then((err) => {if(err) throw err});
*/
    var users = User.find((err, users) => {
        console.log(users);
        res.render('users/index', {users: users, title: 'Users'});
    });

});

router.get('/view', function(req, res, next) {

    let user = User.findOne({username: req.query.name}, (err, user) => {
        res.render('users/view', {user: user, title: 'User'});
    });



});

module.exports = router;
