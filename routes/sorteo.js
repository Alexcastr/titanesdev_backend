const express = require('express');
const sorteoController = require('../controllers/sorteoController');
const hasAdminRole = require('../middlewares/hasAdminRol');
const api = express.Router();
const auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({ uploadDir: './uploads/sorteos/' });
// middleware if rol is admin can access

api.get('/sorteos', sorteoController.getAllSorteos);
api.post('/createsorteo', auth.auth, sorteoController.createSorteo);
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
api.put(
  '/actualizar_sorteo_admin/:id',
  auth.auth,
  sorteoController.actualizar_sorteo_admin
);
api.delete(
  '/eliminar_sorteo_admin/:id',
  auth.auth,
  sorteoController.eliminar_sorteo_admin
);
api.get('/obtener_portada/:img', sorteoController.obtener_portada);

// get all premios that has sorteo id
api.get('/sorteos/premios/:id', sorteoController.getAllPremiosBySorteoId);

// get all participantes that has sorteo id
api.get(
  '/sorteos/participantes/:id',
  sorteoController.getAllParticipantsBySorteoId
);

module.exports = api;
