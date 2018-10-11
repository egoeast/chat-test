let mongoose = require('../libs/mongoose');

Shema = mongoose.Schema;

let schema = new Shema({
    username: {
        type: String,
        required: true,
    },
    socketId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


module.exports.Connection = mongoose.model('connection', schema);