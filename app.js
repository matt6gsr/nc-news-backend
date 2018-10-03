const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api-router');
const {
  handle404,
  handle400Params,
  handle400Post,
  handle500
} = require('./errors');
const DB_URL = process.env.DB_URL || require('./config.js').DB_URL;

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(`connected to ${DB_URL}`);
  })
  .catch(console.log);

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(cors());
app.use('/api', apiRouter);

app.get('/', (req, res, next) => {
  res.status(200).render('index');
});

app.get('/api', (req, res, next) => {
  res.status(200).render('index');
});

app.get('/*', (err, req, res, next) => {
  res.status(404).send({ msg: 'Page Not Found' });
});

app.use(handle404);
app.use(handle400Params);
app.use(handle400Post);
app.use(handle500);

module.exports = app;
