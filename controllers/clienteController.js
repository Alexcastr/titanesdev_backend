"use strict";
var Cliente = require("../models/cliente");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../middlewares/jwt");

const registroCliente = async function (req, res) {
  var data = req.body;

  //Validar correos existentes
  var clienteArrray = [];
  clienteArrray = await Cliente.find({ email: data.email });
  if (clienteArrray.length == 0) {
    //Registro

    //Encryptar contraseya y registrar
    if (data.password) {
      bcrypt.hash(data.password, null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          var reg = await Cliente.create(data);
          res.status(200).send({ data: reg });
        } else {
          res.status(200).send({ Message: "ErrorServer", data: undefined });
        }
      });
    } else {
      res.status(200).send({ Message: "No hay contraseya", data: undefined });
    }
  } else {
    res.status(200).send({ Message: "El correo ya existe", data: undefined });
  }
};

const loginCliente = async function (req, res) {
  var data = req.body;

  //Comprobar si el usuario existe
  var clienteArrray = [];
  clienteArrray = await Cliente.find({ email: data.email });
  if (clienteArrray.length == 0) {
    res.status(200).send({ Message: "El correo no existe", data: undefined });
  } else {
    //Si existe lo almacenados en el array en la pociocion 0
    let user = clienteArrray[0];
    //Desencriptamos la contraseya para comparar
    bcrypt.compare(data.password, user.password, async function (error, check) {
      //si  las contraseyas no coinsiden me retornara el check
      if (check) {
        res.status(200).send({ data: user, token: jwt.createToken(user) });
      } else {
        res
          .status(200)
          .send({ message: "La contraseya no coincide ", data: undefined });
      }
    });

    //validamos con la contraseya sea igual
  }
};

//Vamos a verificar si es admin para que pueda hacer uso de esta peticion
const listarClientesFiltroAdmin = async function (req, res) {
  console.log(req.user);
  if (req.user) {
    if (req.user.role == "admin") {
      let tipo = req.params["tipo"];
      let filtro = req.params["filtro"];
      console.log(tipo);
      if (tipo == null || tipo == "null") {
        let reg = await Cliente.find();
        res.status(200).send({ data: reg });
      } else {
        if (tipo == "apellidos") {
          let reg = await Cliente.find({ apellidos: new RegExp(filtro, "i") });
          res.status(200).send({ data: reg });
        } else if ((tipo = "email")) {
          let reg = await Cliente.find({ email: new RegExp(filtro, "i") });
          res.status(200).send({ data: reg });
        }
      }
    } else {
      res.status(500).send({ message: "NoAccess" });
    }
  } else {
    res.status(500).send({ message: "NoAccess 01" });
  }
};

const registro_cliente_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'admin') {
      var data = req.body;
      bcrypt.hash('123456789', null, null, async function (err, hash) {
        if (hash) {
          data.password = hash;
          let reg = await Cliente.create(data);
          res.status(200).send({ data: reg });
        } else {
          res.status(200).send({ message: 'Error en el servidor', data: undefined });
        }
      })
    } else {
      res.status(500).send({ message: 'No access' });
    }
  } else {
    res.status(500).send({ message: 'No access' });
  }
}

const obtener_cliente_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'admin') {
      var id = req.params['id'];
      try {
        var reg = await Cliente.findById({ _id: id });
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

const actualizar_cliente_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'admin') {
      var id = req.params['id'];
      var data = req.body;
      try {
        var reg = await Cliente.findByIdAndUpdate({ _id: id }, {
          nombres: data.nombres,
          apellidos: data.apellidos,
          email: data.email,
          telefono: data.telefono,
          f_naciemiento: data.f_naciemiento,
          dni: data.dni,
          genero: data.genero,
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

const eliminar_cliente_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == 'admin') {
      var id = req.params['id'];
      try {
        var reg = await Cliente.findByIdAndRemove({ _id: id });
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

const obtener_cliente_guest = async function (req, res) {
  if (req.user) {
    var id = req.params['id']
    try {
      var reg = await Cliente.findById({ _id: id });
      res.status(200).send({ data: reg });
    } catch (error) {
      res.status(200).send({ data: undefined });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
}

const actualizar_perfil_cliente_guest = async function (req, res) {
  if (req.user) {
    var id = req.params['id'];
    var data = req.body;
    try {
      if (data.password) {
        bcrypt.hash(data.password, null, null, async function (err, hash) {
          var reg = await Cliente.findByIdAndUpdate({ _id: id }, {
            nombres: data.nombres,
            apellidos: data.apellidos,
            pais: data.pais,
            telefono: data.telefono,
            f_nacimiento: data.f_nacimiento,
            dni: data.dni,
            genero: data.genero,
            password: hash
          });
          res.status(200).send({ data: reg });
        })
      } else {
        var reg = await Cliente.findByIdAndUpdate({ _id: id }, {
          nombres: data.nombres,
          apellidos: data.apellidos,
          pais: data.pais,
          telefono: data.telefono,
          f_nacimiento: data.f_nacimiento,
          dni: data.dni,
          genero: data.genero,
        });
        res.status(200).send({ data: reg });
      }
    } catch (error) {
      res.status(200).send({ data: undefined });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
}

//DIRECCIONES
const registro_direccion_cliente = async function (req, res) {
  if (req.user) {
    let data = req.body;
    if (data.principal) {
      let direcciones = await Direccion.find({ cliente: data.cliente });
      direcciones.forEach(async element => {
        await Direccion.findByIdAndUpdate({ _id: element._id }, { principal: false })
      })
    }

    let reg = await Direccion.create(data);
    res.status(200).send({ data: reg });
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
}

const obtener_direccion_todos_cliente = async function (req, res) {
  if (req.user) {
    let id = req.params['id'];
    let direcciones = await Direccion.find({ cliente: id }).populate('cliente').sort({ createAt: -1 });
    res.status(200).send({ data: direcciones });
  }
  else {
    res.status(500).send({ message: "NoAccess" });
  }
}

const cambiar_direccion_principal_cliente = async function (req, res) {
  if (req.user) {
    let id = req.params['id'];
    let cliente = req.params['cliente'];
    let direcciones = await Direccion.find({ cliente: cliente });
    direcciones.forEach(async element => {
      await Direccion.findByIdAndUpdate({ _id: element._id }, { principal: false })
    });

    await Direccion.findByIdAndUpdate({ _id: id }, { principal: true })
    res.status(200).send({ data: true });
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
}

const obtener_direccion_principal_cliente = async function (req, res) {
  if (req.user) {
    var direccion = undefined;
    let id = req.params['id'];
    direccion = await Direccion.findOne({ cliente: id, principal: true });
    if (direccion == undefined) {
      res.status(200).send({ data: undefined });
    } else {
      res.status(200).send({ data: direccion });
    }

  }
  else {
    res.status(500).send({ message: "NoAccess" });
  }
}

module.exports = {
  registroCliente, loginCliente,
  listarClientesFiltroAdmin, registro_cliente_admin,
  obtener_cliente_admin, actualizar_cliente_admin,
  eliminar_cliente_admin, obtener_cliente_guest,
  actualizar_perfil_cliente_guest, registro_direccion_cliente,
  obtener_direccion_todos_cliente, cambiar_direccion_principal_cliente,
  obtener_direccion_principal_cliente
};
