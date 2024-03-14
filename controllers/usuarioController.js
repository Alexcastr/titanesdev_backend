'use strict';
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../middlewares/jwt');

const registroUsuario = async function (req, res) {
  const data = req.body;

  //Validar correos existentes
  const usuarioArrray = [];
  usuarioArrray = await Usuario.find({ email: data.email });
  if (usuarioArrray.length == 0) {
    //Registro

    //Encryptar contraseya y registrar
    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          const reg = await Usuario.create(data);
          res.status(200).send({ data: reg });
        } else {
          res.status(200).send({ Message: 'ErrorServer', data: undefined });
        }
      });
    } else {
      res.status(200).send({ Message: 'No hay contraseya', data: undefined });
    }
  } else {
    res.status(200).send({ Message: 'El correo ya existe', data: undefined });
  }
};

const loginUsuario = async function (req, res) {
  const data = req.body;

  //Comprobar si el usuario existe
  const usuarioArrray = [];
  usuarioArrray = await Usuario.find({ email: data.email });
  if (usuarioArrray.length == 0) {
    res.status(200).send({ Message: 'El correo no existe', data: undefined });
  } else {
    //Si existe lo almacenados en el array en la pociocion 0
    let user = usuarioArrray[0];
    //Desencriptamos la contraseya para comparar
    bcrypt.compare(data.password, user.password, async function (error, check) {
      //si  las contraseyas no coinsiden me retornara el check
      if (check) {
        res.status(200).send({ data: user, token: jwt.createToken(user) });
      } else {
        res
          .status(200)
          .send({ message: 'La contraseya no coincide ', data: undefined });
      }
    });
  }
};


module.exports = {
  registroUsuario,
  loginUsuario,
};
