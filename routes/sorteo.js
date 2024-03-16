const express = require('express');
const sorteoController = require('../controllers/sorteoController');
const hasAdminRole = require('../middlewares/hasAdminRol');
const api = express.Router();
// middleware if rol is admin can access

api.get('/sorteos', sorteoController.getAllSorteos);
api.post('/sorteos', hasAdminRole, sorteoController.createSorteo);
api.post('/sorteos/register-user', sorteoController.registerSorteo);

module.exports = api;
