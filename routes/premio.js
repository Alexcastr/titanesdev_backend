const express = require('express');
const premioController = require('../controllers/premioController');
const auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({ uploadDir: './uploads/sorteos/' })
const api = express.Router();

api.get('/premios', premioController.getAllPremios);
api.put('/premios/create/:id', [auth.auth, path],premioController.createPremio);
api.get('/premios/:id', premioController.getPremio);
api.put('/premios/:id', premioController.updatePremio);
api.delete('/premios/:id', premioController.deletePremio);

module.exports = api;
