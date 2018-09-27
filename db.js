let mongoose = require('mongoose');
let User = require('./models/user').User;

//drod db
//create 3 users
//close connection

mongoose.connection.on('open', () => {
    let db = mongoose.connection.db;
    db.dropDatabase((err) => {
        if (err) throw err;
        console.log('Dropped');
        mongoose.disconnect();
    });

});

