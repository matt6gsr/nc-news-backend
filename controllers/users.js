const { User } = require('../models');

const getUserByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username }, '-__v')
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getUserByUsername };
