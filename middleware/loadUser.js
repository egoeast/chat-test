let User = require('../models/user').User;

module.exports = (req, res, next) => {
    if (!req.session.user) return next();

    User.findById(req.session.user, (err, user) => {
        if (err) return next(err);

        req.user = user;
        next();
    })
};