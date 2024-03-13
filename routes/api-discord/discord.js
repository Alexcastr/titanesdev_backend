var express = require('express');
const dcAuth = require('../../controllers/api-discord/authorizeController.js');
const dcSorteo = require('../../controllers/api-discord/sorteoController.js');

const api = express.Router();

api.get('/discord/authorize', dcAuth.authAcount);
api.get('/discord/register-sorteo', dcSorteo);

module.exports = api;
