var mongoose = require('../libs/mongoose');
var crypto = require('crypto');

Shema = mongoose.Schema;

var schema = new Shema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._plainPassword;
    });

schema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword;
};

module.exports.User = mongoose.model('user', schema);