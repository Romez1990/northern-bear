const createError = require('http-errors');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));

app.use('/', routes);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
