const {
  getListGuilds,
  isExistsInServer
} = require('./api-discord/guildsController');
const Sorteo = require('../models/sorteo');
const User = require('../models/usuario');
const getDiscordUser = require('../utils/getDiscordUser');
var fs = require('fs');
var path = require('path');

const getAllSorteos = async (req, res) => {
  try {
    const sorteos = await Sorteo.find();
    console.log('all sorteos', sorteos);
    res.status(200).send(sorteos);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createSorteo = async (req, res) => {
  if (req.user) {
    if (req.user.rol == 'admin') {
      var data = req.body;
      let reg = await Sorteo.create(data);
      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ message: 'No access' });
    }
  } else {
    res.status(500).send({ message: 'No access' });
  }
};

const registerSorteo = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { sorteoId } = req.body;

    const tokenDc = authorization.split(' ')[1];

    const listGuilds = await getListGuilds(tokenDc);
    if (!(listGuilds.length > 0))
      res.send('El usuario no tiene ningun servidor');

    const dataUserDc = await getDiscordUser({ token: tokenDc });
    const { id } = dataUserDc;
    const user = await User.findOne({ discordId: id });

    if (!user) res.send('No existe el usuario');
    if (isExistsInServer(listGuilds)) {
      const { message, status } = await registerParticipantsInSorteo(
        sorteoId,
        user.id
      );

      res.send({ message, status });
    } else {
      console.log(false);

      res.send({ message: 'El usuario no esta en el servidor', status: 'NOTSERVER' });

      res.send({ message: 'No perteneces al servidor', status: 'NOTSERVER' });

    }
  } catch (error) {
    // throw error;
  }
};

const registerParticipantsInSorteo = async (sorteoId, usuarioId) => {
  try {
    const sorteo = await Sorteo.findById(sorteoId);
    console.log(sorteoId);
    if (!sorteo) {
      return { message: 'No existe el sorteo', status: 'NOTSORTEO' };
    }

    if (sorteo.participants.includes(usuarioId)) {
      return { message: 'Usuario ya está registrado en el sorteo', status: 'ISIN' };
    }

    sorteo.participants.push(usuarioId);
    await sorteo.save();
    return { message: 'Usuario registrado con exito', status: 'OK' };
  } catch (error) {
    console.log(error);
  }
};

const agregar_imgPortada_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == 'admin') {
      let id = req.params['id']
      let data = req.body;
      if (req.files) {
        //SI HAY IMG
        var img_path = req.files.imagen.path;
        var name = img_path.split('\\');
        var imagen_name = name[2];
        //data.portada = portada_name;
        let reg = await Sorteo.findByIdAndUpdate({ _id: id }, {
          $push: {
            galeria: {
              imagen_name,
              _id: data._id
            }
          }
        });
        res.status(200).send({ data: reg });
      }
    } else {
      res.status(500).send({ message: "NoAccess" });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
}

const obtener_sorteo_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == "admin") {
      var id = req.params['id'];
      try {
        var reg = await Sorteo.findById({ _id: id });
        res.status(200).send({ data: reg });
      } catch (error) {
        res.status(200).send({ data: undefined });
      }
    } else {
      res.status(200).send({ data: reg });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
};

const eliminar_imagen_galeria_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == 'admin') {
      var id = req.params['id'];
      let data = req.body;
      try {
        let reg = await Sorteo.findByIdAndUpdate({ _id: id }, {
          $pull: {
            galeria: {
              _id: data._id
            }
          }
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



module.exports = {
  getAllSorteos, createSorteo,
  registerSorteo, agregar_imgPortada_admin,
  obtener_sorteo_admin, eliminar_imagen_galeria_admin
};
