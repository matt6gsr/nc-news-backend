const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  development: 'mongodb://localhost:27017/northcoders-news',
  test: 'mongodb://localhost:27017/northcoders-news-test',
  production: 'mongodb://matt:abc123@ds159812.mlab.com:59812/ncnews'
};

module.exports = config[NODE_ENV];
