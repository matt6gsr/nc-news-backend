const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  development: 'mongodb://localhost:27017/northcoders-news',
  test: 'mongodb://localhost:27017/northcoders-news-test'
};

module.exports = config[NODE_ENV];
