let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const hbs = require("hbs");
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let mongoose = require("mongoose")
let app = express();


var session = require('express-session')
var MongoStore = require('connect-mongo');


app.use(session({
  secret: 'i need more beers',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://admin:admin@cluster0.64ha8.mongodb.net/mydatabase',
  })
}))


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);

hbs.registerPartials(__dirname + "/views/partials");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
