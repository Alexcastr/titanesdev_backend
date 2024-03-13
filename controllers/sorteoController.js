const Sorteo = require('../models/sorteo');

const getAllSorteos = async (req, res) => {
  try {
    const sorteos = await Sorteo.find();
    console.log('all sorteos', sorteos);
    res.status(200).send(sorteos);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createSorteo = async (req, res) => {
  try {
    const sorteo = await Sorteo.create(req.body);
    console.log('create sorteo', sorteo);
    res.status(201).send(sorteo);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
};

module.exports = {
  getAllSorteos,
  createSorteo
};
