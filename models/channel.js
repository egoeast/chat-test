let mongoose = require('../libs/mongoose');

Shema = mongoose.Schema;

let schema = new Shema({
    name: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    },
});


module.exports.Channel = mongoose.model('channel', schema);