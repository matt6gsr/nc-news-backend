process.env.NODE_ENV = 'production';
const seedDB = require('./seed');
const mongoose = require('mongoose');
const { DB_URL } = require('../config');
const data = require('./devData');

mongoose
  .connect(DB_URL)
  .then(() => {
    return seedDB(data);
  })
  .then(() => {
    console.log('Database Seed Successful');
    mongoose.disconnect();
  });
