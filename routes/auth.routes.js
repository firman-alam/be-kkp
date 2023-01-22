const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router
  .post('/', authController.login)
  .post('/logout', authController.logout)
  .get('/refresh', authController.refresh);

module.exports = router;
