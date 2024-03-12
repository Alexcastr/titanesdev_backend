"use strict";
var express = require("express");
var adminController = require("../controllers/adminController");
var auth = require("../middlewares/authenticate");

var api = express.Router();

api.post("/registroAdmin", adminController.registroAdmin);
api.post("/loginAdmin", adminController.loginAdmin);
api.get("/listaAdmin", auth.auth, adminController.listaAdmin);

module.exports = api;
