var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require('passport')
//errorHandler
const errorHandler = require('./middleWare/errorHandler')
//import config
var config = require('./config/index')
//import mongoose
var mongoose = require('mongoose')

//router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var brandRouter = require('./routes/brand');

var app = express();

//connect Mongoose
mongoose.connect( config.MONGODB_URI , {useNewUrlParser: true, useUnifiedTopology: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({
  limit : "50mb"
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/brand',brandRouter);


app.use(errorHandler)

module.exports = app;
