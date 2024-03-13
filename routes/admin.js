'use strict';
const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authenticate');

const api = express.Router();

api.post('/registroAdmin', adminController.registroAdmin);
api.post('/loginAdmin', adminController.loginAdmin);
api.get('/listaAdmin', auth.auth, adminController.listaAdmin);

module.exports = api;
