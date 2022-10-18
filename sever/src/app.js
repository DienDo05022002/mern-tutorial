const express = require('express')
const app = express()
const createError = require('http-errors');
const cors = require('cors')
require('dotenv').config()

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header ('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//   }),
// );
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(require('./api'))


app.get('/', (req, res) => {
  res.send('Hello add World!')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "Not found"));
});
app.use(function (req, res, next) {
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;