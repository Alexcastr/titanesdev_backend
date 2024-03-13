const express = require('express');
const dc = require('../../controllers/api-discord/authorize.controller.js');

const api = express.Router();

api.get('/discord/authorize', dc.authAcount);
api.get('/discord/register-sorteo', dc.registerSorteo);

module.exports = api;
