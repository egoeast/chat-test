const mongoose = require('mongoose');
//const config = require('../config/index');

//mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));


/*mongoose.connect('mongodb://localhost/chat', {
    "server": {
        "socetOptions": {
            "keepAlive": 1
        }
    }
});*/

mongoose.connect('mongodb://user:pass123@ds263571.mlab.com:63571/egoeast-chat', {
    "server": {
        "socetOptions": {
            "keepAlive": 1
        }
    }
});




module.exports = mongoose;