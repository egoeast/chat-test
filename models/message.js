let mongoose = require('../libs/mongoose');
let UserFile = require('../models/userFile').UserFile;

Shema = mongoose.Schema;

let schema = new Shema({
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: Shema.Types.ObjectId,
        ref: 'user'
    },
    channelId: {
        type: String,
        required: false,
    },
    attachments: [
        {
            type: Shema.Types.ObjectId,
            ref: 'UserFile'
        }
    ],
    created: {
        type: Date,
        default: Date.now()
    },
    text: {
        type: String,
        default: ''
    },
});

schema.virtual('attachmensArray').get(function () {
    let attachments = [];
    this.attachments.forEach((item) => {
        UserFile.findOne({_id: item}, (err, file) => {
            console.log(file);
            if (err) {
                return next(err);
            }
            attachments.push(file)
        })
    });

    return attachments;
});

module.exports.Message = mongoose.model('message', schema);