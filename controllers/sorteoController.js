const {
  getListGuilds,
  isExistsInServer
} = require('./api-discord/guildsController');
const Sorteo = require('../models/sorteo');
const User = require('../models/usuario');
const getDiscordUser = require('../utils/getDiscordUser');

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
  try {
    const sorteo = await Sorteo.create(req.body);
    console.log('create sorteo', sorteo);
    res.status(201).send(sorteo);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
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
      res.send({ message: 'El usuario no esta en el servidor', status: 'NOTSERVER'});
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

module.exports = {
  getAllSorteos,
  createSorteo,
  registerSorteo
};
