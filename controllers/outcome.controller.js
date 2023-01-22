const db = require('../models');
const outcome = db.outcome;
const asyncHandler = require('express-async-handler');
const sequelize = db.Sequelize;

// @desc Create new outcome
// @route POST /outcome
// @access Private
const createNewOutcome = asyncHandler(async (req, res) => {
  const {
    nominal_tunai,
    nominal_transfer,
    keterangan,
    kategori,
    tanggal,
    nama,
  } = req.body;

  // confirm data
  if (
    !nominal_tunai ||
    !nominal_transfer | !keterangan | !kategori | !tanggal
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // create data
  outcome
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

// @desc Get all outcome
// @route GET /outcome
// @access Private
const findAllOutcome = asyncHandler(async (req, res) => {
  outcome
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

// @desc Get total  of outcome
// @route GET /income/transfer/total
// @access Private
const getTotal = asyncHandler(async (req, res) => {
  const total = await outcome.findAll({
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

// @desc update an outcome
// @route PATCH /outcome
// @access Private
const updateOutcome = asyncHandler(async (req, res) => {
  const { nominal_tunai, nominal_transfer, keterangan, kategori, tanggal, id } =
    req.body;

  if (!nominal_tunai | !nominal_transfer | !keterangan | !kategori | !tanggal) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  outcome
    .update(
      { nominal_tunai, nominal_transfer, keterangan, kategori, tanggal, id },
      {
        where: { id: id },
      }
    )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'outcome was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update outcome with id=${id}. Maybe outcome was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating outcome with id=' + id,
      });
    });
});

// @desc  delete an outcome
// @route DELETE /outcome
// @access Private
const deleteOutcome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // confirm data
  if (!id) {
    return res.status(400).json({ message: 'Note ID required' });
  }

  outcome
    .destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Outcome was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Outcome with id=${id}. Maybe Outcome was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Outcome with id=' + id,
      });
    });
});

module.exports = {
  createNewOutcome,
  findAllOutcome,
  updateOutcome,
  deleteOutcome,
  getTotal,
};
