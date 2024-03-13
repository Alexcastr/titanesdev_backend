'use strict';
const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authenticate');

const api = express.Router();

api.post('/registroAdmin', adminController.registroAdmin);
api.post('/loginAdmin', adminController.loginAdmin);
api.get('/listaAdmin', auth.auth, adminController.listaAdmin);
api.get('/listarUsuariosAdmin', auth.auth, adminController.listarUsuariosAdmin);
api.delete("/eliminar_usuario_admin/:id", auth.auth, adminController.eliminar_usuario_admin);

module.exports = api;
