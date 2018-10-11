let mongoose = require('../libs/mongoose');

Shema = mongoose.Schema;

let schema = new Shema({
    username: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    },
    text: {
        type: String,
        required: true
    },
});


module.exports.Message = mongoose.model('message', schema);