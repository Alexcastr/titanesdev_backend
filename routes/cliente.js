"use strict";
var express = require("express");
var clienteController = require("../controllers/clienteController");

var api = express.Router();
var auth = require("../middlewares/authenticate");

api.post("/registroCliente", clienteController.registroCliente);
api.post("/loginCliente", clienteController.loginCliente);
api.get(
  "/listarClientesFiltroAdmin/:tipo/:filtro", auth.auth,
  clienteController.listarClientesFiltroAdmin
);
api.post("/registro_cliente_admin", auth.auth, clienteController.registro_cliente_admin);
api.get("/obtener_cliente_admin/:id", auth.auth, clienteController.obtener_cliente_admin);
api.put("/actualizar_cliente_admin/:id", auth.auth, clienteController.actualizar_cliente_admin);
api.delete("/eliminar_cliente_admin/:id", auth.auth, clienteController.eliminar_cliente_admin);
api.get("/obtener_cliente_guest/:id", auth.auth, clienteController.obtener_cliente_guest);
api.put("/actualizar_perfil_cliente_guest/:id", auth.auth, clienteController.actualizar_perfil_cliente_guest);

//DIRECCIONES
api.post("/registro_direccion_cliente", auth.auth, clienteController.registro_direccion_cliente);
api.get("/obtener_direccion_todos_cliente/:id", auth.auth, clienteController.obtener_direccion_todos_cliente);
api.put("/cambiar_direccion_principal_cliente/:id/:cliente", auth.auth, clienteController.cambiar_direccion_principal_cliente);
api.get("/obtener_direccion_principal_cliente/:id", auth.auth, clienteController.obtener_direccion_principal_cliente);


module.exports = api;
