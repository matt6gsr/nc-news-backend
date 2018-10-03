exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: err.msg || 'Page Not Found' });
  } else next(err);
};

exports.handle400Params = (err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(400).send({ msg: err.message || 'Invalid Parameters' });
  } else next(err);
};

exports.handle400Post = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ msg: err.message || 'Invalid Post' });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send('Internal Server Error');
};
