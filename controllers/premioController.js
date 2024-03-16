const Premio = require('../models/premio');
const isValidObjectId = require('../utils/isValidObjectId.js');
const getAllPremios = async (req, res) => {
  try {
    const premios = await Premio.find();
    console.log('all premios', premios);
    res.status(200).send(premios);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createPremio = async (req, res) => {
  try {
    const premio = await Premio.create(req.body);
    console.log('create premio', premio);
    res.status(201).send(premio);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
};

const getPremio = async (req, res) => {
  try {
    const { id } = req.params;

    // verify if it is a mongo id
    if (!isValidObjectId(id)) {
      return res.status(400).send('Id no válido');
    }

    const premio = await Premio.findById(id);

    if (!premio) {
      return res.status(404).send('Premio no encontrado');
    }
    // console.log('get premio', premio);
    res.status(200).send(premio);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
};

const updatePremio = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).send('Id no válido');
    }
    const premio = await Premio.findByIdAndUpdate(id, req.body, { new: true });

    if (!premio) {
      return res.status(404).send('Premio no encontrado');
    }
    res.status(200).send(premio);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
};

const deletePremio = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).send('Id no válido');
    }

    const deletedPremio = await Premio.findByIdAndDelete(id);
    if (!deletedPremio) {
      return res.status(404).send('Premio no encontrado');
    }
    res.status(204).send(deletedPremio);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllPremios,
  createPremio,
  getPremio,
  updatePremio,
  deletePremio
};
