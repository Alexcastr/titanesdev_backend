'use strict';
const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const api = express.Router();
const auth = require('../middlewares/authenticate');

api.post('/registroUsuario', usuarioController.registroUsuario);
api.post('/loginUsuario', usuarioController.loginUsuario);

module.exports = api;
