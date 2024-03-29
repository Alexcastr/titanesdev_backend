'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

exports.auth = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: 'here is no authorization header'
    });
  }

  var token = req.headers.authorization.replace(/['"]+/g, '');
  var segment = token.split('.');

  //console.log(token);
  //console.log(segment);
  if (segment.length != 3) {
    return res.status(403).send({ message: 'InvalidToken' });
  } else {
    try {
      var payload = jwt.decode(token, secret);
      //console.log(payload)
      if (payload <= moment().unix()) {
        return res.status(403).send({ message: 'ExpiredToken' });
      }
    } catch (error) {
      return res.status(403).send({ message: 'InvalidToken 01' });
    }
  }

  req.user = payload;

  next();
};
