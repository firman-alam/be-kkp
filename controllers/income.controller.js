const db = require('../models');
const income = db.incomes;
const asyncHandler = require('express-async-handler');
const sequelize = db.Sequelize;

// @desc Create new income
// @route POST /income
// @access Private
const createNewIncome = asyncHandler(async (req, res) => {
  const {
    nama,
    nominal_tunai,
    nominal_transfer,
    keterangan,
    kategori,
    tanggal,
  } = req.body;

  // confirm data
  if (!nama | !keterangan | !kategori | !tanggal) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // create data
  income
    .create({
      nama,
      nominal_tunai,
      nominal_transfer,
      keterangan,
      kategori,
      tanggal,
    })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Something went wrong' });
    });
});

// @desc Get all income
// @route GET /income
// @access Private
const findAllIncome = asyncHandler(async (req, res) => {
  income
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
});

// @desc Get total of income
// @route GET /income/tunai/total
// @access Private
const getTotal = asyncHandler(async (req, res) => {
  const total = await income.findAll({
    attributes: [
      [sequelize.fn('SUM', sequelize.col('nominal_tunai')), 'totaltu'],
      [sequelize.fn('SUM', sequelize.col('nominal_transfer')), 'totaltr'],
    ],
  });

  if (!total)
    res.status(400).send({
      message: err.message || 'Some error occurred while retrieving tutorials.',
    });

  res.status(201).send(total);
});

// @desc update an income
// @route PATCH /income
// @access Private
const updateIncome = asyncHandler(async (req, res) => {
  const {
    id,
    nama,
    nominal_tunai,
    nominal_transfer,
    keterangan,
    kategori,
    tanggal,
  } = req.body;

  if (!nama | !keterangan | !kategori | !tanggal) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  income
    .update(
      { nama, nominal_tunai, nominal_transfer, keterangan, kategori, tanggal },
      {
        where: { id: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'income was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update income with id=${id}. Maybe income was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating income with id=' + id,
      });
    });
});

// @desc  delete an income
// @route DELETE /income
// @access Private
const deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // confirm data
  if (!id) {
    return res.status(400).json({ message: 'ID required' });
  }

  income
    .destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Income was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Income with id=${id}. Maybe Income was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Income with id=' + id,
      });
    });
});

module.exports = {
  createNewIncome,
  findAllIncome,
  updateIncome,
  deleteIncome,
  getTotal,
};
