'use strict';

const Admin = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');
//Exportamos el token
const jwt = require('../middlewares/jwt');
const Usuario = require('../models/usuario');

const registroAdmin = async function (req, res) {
  const data = req.body;

  //Validar correos existentes
  const adminArrray = [];
  adminArrray = await Admin.find({ email: data.email });
  if (adminArrray.length == 0) {
    //Registro

    //Encryptar contraseya y registrar
    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          const reg = await Admin.create(data);
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

const loginAdmin = async function (req, res) {
  const data = req.body;

  //Comprobar si el usuario existe
  let adminArrray = [];
  adminArrray = await Admin.find({ email: data.email });
  if (adminArrray.length == 0) {
    res.status(200).send({ Message: 'El correo no existe', data: undefined });
  } else {
    //Si existe lo almacenados en el array en la pociocion 0
    let user = adminArrray[0];
    //Desencriptamos la contraseya para comparar
    bcrypt.compare(data.password, user.password, async function (error, check) {
      //si  las contraseyas no coinsiden me retornara el check
      if (check) {
        res.status(200).send({ data: user, token: jwt.createToken(user) });
      } else {
        res
          .status(200)
          .send({ Message: 'La contraseya no coincide ', data: undefined });
      }
    });

    //validamos con la contraseya sea igual
  }
};

const listaAdmin = async function (req, res) {
  try {
    // Verificar si el usuario está autenticado y tiene rol de administrador
    if (!req.user || req.user.rol !== 'admin') {
      return res.status(403).send({ message: 'Acceso denegado' });
    }

    // Obtener todos los registros de administradores
    const registros = await Admin.find({});

    // Enviar los datos como respuesta
    res.status(200).send({ data: registros });
  } catch (error) {
    // Manejar errores
    console.error('Error al obtener lista de administradores:', error);
    res.status(500).send({ message: 'Error del servidor' });
  }
};

const listarUsuariosAdmin = async function (req, res) {
  try {
    // Verificar si el usuario está autenticado y tiene rol de administrador
    if (!req.user || req.user.rol !== 'admin') {
      return res.status(403).send({ message: 'Acceso denegado' });
    }

    // Obtener todos los registros de administradores
    const usuarios = await Usuario.find({});

    // Enviar los datos como respuesta
    res.status(200).send({ data: usuarios });
  } catch (error) {
    // Manejar errores
    console.error('Error al obtener lista de usuarios:', error);
    res.status(500).send({ message: 'Error del servidor' });
  }
};

const eliminar_usuario_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == 'admin') {
      var id = req.params['id'];
      try {
        var reg = await Usuario.findByIdAndRemove({ _id: id });
        res.status(200).send({ data: reg });
      } catch (error) {
        res.status(200).send({ data: undefined });
      }
    } else {
      res.status(500).send({ message: "NoAccess" });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
}


module.exports = { registroAdmin, loginAdmin, listaAdmin, listarUsuariosAdmin, eliminar_usuario_admin };
