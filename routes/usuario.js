"use strict";
var express = require("express");
var usuarioController = require("../controllers/usuarioController");

var api = express.Router();
var auth = require("../middlewares/authenticate");

api.post("/registroUsuario", usuarioController.registroUsuario);
api.post("/loginUsuario", usuarioController.loginUsuario);

module.exports = api;
