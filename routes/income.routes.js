const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/income.controller');
const verifyJWT = require('../middleware/verifyJwt');

router
  .get('/', incomeController.findAllIncome)
  .post('/', verifyJWT, incomeController.createNewIncome)
  .patch('/', verifyJWT, incomeController.updateIncome)
  .get('/total', incomeController.getTotal)
  .delete('/:id', verifyJWT, incomeController.deleteIncome);

module.exports = router;
