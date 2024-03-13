const express = require('express');
const sorteoController = require('../controllers/sorteoController');

const api = express.Router();
// middleware if rol is admin can access

api.get('/sorteos', sorteoController.getAllSorteos);
api.post('/sorteos', sorteoController.createSorteo);

module.exports = api;
