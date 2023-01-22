const asyncHandler = require('express-async-handler');
const db = require('../models');
const income = db.incomes;
const outcome = db.outcomes;

// @desc get data of certain category
// @route GET /category/:id
// @access private
const getCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const dataIn = await income.findAll({ where: { kategori: id } });
  const dataOut = await outcome.findAll({ where: { kategori: id } });

  if (!dataIn | !dataOut)
    res.status(400).send({
      message:
        err.message || 'Some error occurred while retrieving categories.',
    });

  res.status(200).send([...dataIn, ...dataOut]);
});

module.exports = {
  getCategoryById,
};
