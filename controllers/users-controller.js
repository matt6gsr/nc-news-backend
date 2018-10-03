const { User } = require('../models');

const getUsers = (req, res, next) => {
  User.find(null, '-__v')
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};

const getUserByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username }, '-__v')
    .then(user => {
      if (!user) {
        throw { msg: 'User Not Found', status: 404 };
      } else res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getUsers, getUserByUsername };
