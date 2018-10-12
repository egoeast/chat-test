var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var HttpError = require('./error/index').HttpError;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var chatRouter = require('./routes/chat');
var testRouter = require('./routes/test');
var apiRouter = require('./routes/api');

var config = require('./config');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('./libs/mongoose');

var app = express();

// view engine setup

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: config.get('session:secret'),
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
}));
app.use(require('middleware/loadUser'));

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
//app.use('/logout', logoutRouter);
app.use('/chat', chatRouter);
app.use('/test', testRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  /*if (typeof err == 'number') {
    err = new HttpError(err);
  }*/
  console.log(err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: "Error"});
});

module.exports = app;
