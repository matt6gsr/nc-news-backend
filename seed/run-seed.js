process.env.NODE_ENV = 'production';
const seedDB = require('./seed');
const mongoose = require('mongoose');
const { DB_URL } = require('../config.js');

const data = require('./devData');
console.log(process.env.NODE_ENV);
console.log(DB_URL, '********');
mongoose
  .connect(DB_URL)
  .then(() => {
    return seedDB(data);
  })
  .then(() => {
    console.log('Database Seed Successful');
    mongoose.disconnect();
  });
