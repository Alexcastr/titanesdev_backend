const express = require('express');
const dcAuth = require('../../controllers/api-discord/authorizeController.js');

const api = express.Router();

api.get('/discord/authorize', dcAuth.authAcount);

module.exports = api;
