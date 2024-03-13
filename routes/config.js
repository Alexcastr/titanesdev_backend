'use strict';
const express = require('express');
const configController = require('../controllers/configController');
const multiparty = require('connect-multiparty');
const path = multiparty({ uploadDir: './uploads/configuraciones' });

const api = express.Router();
const auth = require('../middlewares/authenticate');

api.put(
  '/actualiza_config_admin/:id',
  [auth.auth, path],
  configController.actualiza_config_admin
);
api.get(
  '/obtener_config_admin',
  auth.auth,
  configController.obtener_config_admin
);
api.get('/obtener_logo/:img', configController.obtener_logo);
api.get('/obtener_config_publico', configController.obtener_config_publico);
//api.delete("/eliminar_config_admin/:id", auth.auth, configController.eliminar_config_admin);

module.exports = api;
