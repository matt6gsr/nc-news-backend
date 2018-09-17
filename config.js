const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  development: { DB_URL: 'mongodb://localhost:27017/northcoders-news' },
  test: { DB_URL: 'mongodb://localhost:27017/northcoders-news-test' },
  production: { DB_URL: 'mongodb://matt:abc123@ds159812.mlab.com:59812/ncnews' }
};

module.exports = config[NODE_ENV];
