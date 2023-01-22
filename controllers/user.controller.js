const asyncHandler = require('express-async-handler');
const db = require('../models');
const user = db.user;

// @desc Create new user
// @route POST /users
// @access Private
const createUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  user
    .create({ username, password: bcrypt.hashSync(password, 8) })
    .then(() => {
      res.status(201).send({ message: 'Successfull registered' });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// @desc Get all users
// @route GET /users
// @access Private
const getUser = asyncHandler(async (req, res) => {
  user
    .findAll({
      attribute: ['username'],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
});

module.exports = {
  createUser,
  getUser,
};
