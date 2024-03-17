'use strict';

const Admin = require('../models/admin');
const bcrypt = require('bcrypt-nodejs');
//Exportamos el token
const jwt = require('../middlewares/jwt');
const Usuario = require('../models/usuario');

const registroAdmin = async function (req, res) {
  if (!req.user || req.user.rol !== 'admin') {
    return res.status(403).send({ message: 'Acceso denegado' });
  }

  const data = req.body;

  //Validar correos existentes
  let adminArray = [];
  adminArray = await Admin.find({ email: data.email });
  if (adminArray.length === 0) {
    //Registro

    //Encryptar contraseña y registrar
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
      res.status(200).send({ Message: 'No hay contraseña', data: undefined });
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
    res.status(200).send(usuarios);
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

const actualizar_usuario_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == 'admin') {
      var id = req.params['id'];
      var data = req.body;
      try {
        var reg = await Usuario.findByIdAndUpdate({ _id: id }, {
          username: data.username,
          rol: data.rol
        });
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

const actualizar_admin = async function (req, res) {
  if (req.user && req.user.rol === 'admin') {
    const id = req.params.id;
    const data = req.body;
    try {
      // Hash de la nueva contraseña
      bcrypt.hash('123456789', null, null, async function (err, hash) {
        if (err) {
          res.status(500).send({ message: "Error al hashear la contraseña" });
        } else {
          // Actualizar el administrador con la nueva contraseña hash
          const reg = await Admin.findByIdAndUpdate(id, {
            username: data.username,
            email: data.email,
            password: hash,
            rol: data.rol,
          });
          res.status(200).send({ data: reg });
        }
      });
    } catch (error) {
      res.status(500).send({ message: "Error al actualizar el administrador" });
    }
  } else {
    res.status(403).send({ message: "Acceso denegado" });
  }
}


const obtener_usuario_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == 'admin') {
      var id = req.params['id'];
      try {
        var reg = await Usuario.findById({ _id: id });
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

const obtener_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == 'admin') {
      var id = req.params['id'];
      try {
        var reg = await Admin.findById({ _id: id });
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

/*const obtener_usuario_guest = async function (req, res) {
  if (req.user) {
    var id = req.params['id']
    try {
      var reg = await Usuario.findById({ _id: id });
      res.status(200).send({ data: reg });
    } catch (error) {
      res.status(200).send({ data: undefined });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
}*/



module.exports = {
  registroAdmin, loginAdmin, listaAdmin,
  listarUsuariosAdmin, eliminar_usuario_admin,
  actualizar_usuario_admin, obtener_usuario_admin, obtener_admin,
  actualizar_admin
};
