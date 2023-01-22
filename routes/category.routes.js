const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const verifyJWT = require('../middleware/verifyJwt');

router.use(verifyJWT);

router.get('/:id', categoryController.getCategoryById);

module.exports = router;
