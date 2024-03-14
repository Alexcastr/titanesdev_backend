'use strict';
const express = require('express');
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/authenticate');
const hasAdminRole = require('../middlewares/hasAdminRol');

const api = express.Router();

api.post('/registroAdmin', adminController.registroAdmin);
api.post('/loginAdmin', adminController.loginAdmin);
api.get('/listaAdmin', auth.auth, adminController.listaAdmin);
api.get('/listarUsuariosAdmin', auth.auth, adminController.listarUsuariosAdmin);
api.delete(
  '/eliminar_usuario_admin/:id',
  auth.auth,
  adminController.eliminar_usuario_admin
);
api.get('/obtener_usuario_admin/:id',auth.auth,adminController.obtener_usuario_admin);
api.get('/obtener_usuario_guest/:id', auth.auth, adminController.obtener_usuario_guest);
api.put('/actualizar_usuario_admin/:id', auth.auth, adminController.actualizar_usuario_admin);

module.exports = api;
