const express = require('express');
const sorteoController = require('../controllers/sorteoController');
const hasAdminRol = require('../middlewares/hasAdminRol');

const api = express.Router();
const auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({ uploadDir: './uploads/sorteos/' });
// middleware if rol is admin can access

api.get('/sorteos', sorteoController.getAllSorteos);
<<<<<<< HEAD
api.post('/createsorteo', auth.auth, sorteoController.createSorteo);
=======
api.post('/sorteos', hasAdminRol, sorteoController.createSorteo);
>>>>>>> 916fe941e9fc163135248593b2e7027ba3838b06
api.post('/sorteos/register-user', sorteoController.registerSorteo);
api.put(
  '/agregar_imgPortada_admin/:id',
  [auth.auth, path],
  sorteoController.agregar_imgPortada_admin
);
api.get(
  '/obtener_sorteo_admin/:id',
  auth.auth,
  sorteoController.obtener_sorteo_admin
);
api.put(
  '/eliminar_imagen_galeria_admin/:id',
  auth.auth,
  sorteoController.eliminar_imagen_galeria_admin
);

module.exports = api;
