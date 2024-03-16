const express = require('express');
const sorteoController = require('../controllers/sorteoController');
const hasAdminRol = require('../middlewares/hasAdminRol');

const api = express.Router();
// middleware if rol is admin can access

api.get('/sorteos', sorteoController.getAllSorteos);
api.post('/sorteos/register-sorteo', sorteoController.registerSorteo);
api.post('/sorteos', hasAdminRol, sorteoController.createSorteo);

module.exports = api;
