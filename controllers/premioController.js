const Premio = require('../models/premio');

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
    const premio = await Premio.findById(id);
    console.log('get premio', premio);
    res.status(200).send(premio);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
};

const updatePremio = async (req, res) => {
  try {
    const { id } = req.params;
    const premio = await Premio.findByIdAndUpdate(id, req.body, { new: true });
    console.log('update premio', premio);
    res.status(200).send(premio);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
};

const deletePremio = async (req, res) => {
  try {
    const { id } = req.params;
    await Premio.findByIdAndDelete(id);
    res.status(204).send('Premio eliminado');
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
