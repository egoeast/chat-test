let mongoose = require('mongoose');
mongoose.set('debug', true);
let async = require('async');
let User = require('./models/user').User;

//drod db
//create 3 users
//close connection

async.series([
  open,
  dropDatabase,
  createUsers,
  close
], (err) => {
    console.log(arguments);
    mongoose.disconnect();
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    let db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function createUsers(callback) {

    let users = [
        {username: 'Vasia pupkin', password: 'vasia'},
        {username: 'Petia pupkin', password: '1234'},
        {username: 'Vania pupkin', password: 'qwert'}
    ];
    async.each(users, (userData, callback) => {
        let user = new User(userData);
        user.save(callback);
    }, callback);
}

function close() {
    mongoose.disconnect();
}

/*
mongoose.connection.on('open', () => {
    let db = mongoose.connection.db;
    db.dropDatabase((err) => {
        if (err) throw err;
        console.log('Dropped');

        async.parallel
        let vasia = new User({username: 'Vasia pupkin', password: 'vasia'});
        let petia = new User({username: 'Petia pupkin', password: '1234'});
        let vania = new User({username: 'Vania pupkin', password: 'qwert'});

        //vasia.save();
        //petia.save();
        vasia.save().then((err) => {if(err) throw err});
        mongoose.disconnect();
    });

});

*/
