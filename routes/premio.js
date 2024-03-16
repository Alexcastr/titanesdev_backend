const express = require('express');
const premioController = require('../controllers/premioController');
const api = express.Router();

api.get('/premios', premioController.getAllPremios);
api.post('/premios', premioController.createPremio);
api.get('/premios/:id', premioController.getPremio);
api.put('/premios/:id', premioController.updatePremio);
api.delete('/premios/:id', premioController.deletePremio);

module.exports = api;
