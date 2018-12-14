let mongoose = require('../libs/mongoose');

Shema = mongoose.Schema;

let schema = new Shema({
    name: {
        type: String,
        required: true,
    },
    messages: {
        type: Array,
    },
    created: {
        type: Date,
        default: Date.now()
    },
});


module.exports.Channel = mongoose.model('channel', schema);