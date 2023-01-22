const asyncHandler = require('express-async-handler');
const db = require('../models');
const user = db.user;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  user
    .findOne({ where: { username: username } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      let passwdIsValid = bcrypt.compareSync(password, user.password);

      if (!passwdIsValid)
        return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: user.username,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );

      const userObj = {
        accessToken: accessToken,
        username: user.username,
      };

      res.json(userObj);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });

      const foundUser = await user.findOne({
        username: decoded.username,
      });

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ accessToken });
    })
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.json({ message: 'Cookie cleared' });
};

module.exports = {
  login,
  logout,
  refresh,
};
