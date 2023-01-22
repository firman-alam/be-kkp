const express = require('express');
const router = express.Router();
const outcomeController = require('../controllers/outcome.controller');
const verifyJWT = require('../middleware/verifyJwt');

router
  .get('/', outcomeController.findAllOutcome)
  .post('/', verifyJWT, outcomeController.createNewOutcome)
  .patch('/', verifyJWT, outcomeController.updateOutcome)
  .get('/total', outcomeController.getTotal)
  .delete('/:id', verifyJWT, outcomeController.deleteOutcome);

module.exports = router;
