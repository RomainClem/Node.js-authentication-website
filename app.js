const express = require('express');
const path = require('path');
const logger = require('morgan');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
require('dotenv').config();

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const adminRouter = require('./routes/admin');

const setUser = require('./middlewares/setUser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(setUser);
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/admin', adminRouter);


// catch 404 and forward to a page without a specific error message
app.use(function(req, res) {
  res.render('error', {errorMsg: "There's nothing this wae my broda!"});
});

module.exports = app;