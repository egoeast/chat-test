let mongoose = require('../libs/mongoose');

Shema = mongoose.Schema;

let schema = new Shema({
    name: {
        type: String,
        required: true,
    },
    realName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
    messageId: {
        type: Shema.Types.ObjectId,
        ref: 'Message'
    },
    userId: {
        type: Shema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now()
    },
});


module.exports.UserFile = mongoose.model('UserFile', schema);