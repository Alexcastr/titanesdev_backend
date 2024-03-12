const axios = require('axios');
require('dotenv').config();

const baseUrl = 'https://discord.com/api/v10';
const redirectUri = 'http://localhost:3000/api/discord/authorize';
const idServerDevtalles = '1130900724499365958';

const Usuario = require('../../models/usuario');

const authAcount = async (req, res) => {
  try {
    if (req.query.error == 'access_denied') {
      return res.redirect('http://localhost:4200/dashboard');
    }
    const { code } = req.query;
    const tokenResponse = await exchangeCode(code);

    const { access_token } = tokenResponse;

    if (access_token) {
      const resp = await getUser({ token: access_token });

      console.log('resp del user', access_token);
      const { id, username, avatar } = resp;
      const usuario = await Usuario.findOne({ discordId: id });

      if (!usuario) {
        const newUser = await Usuario.create({
          discordId: id,
          username,
          avatar
        });
        // await Usuario.save(newUser);
        console.log('Usuario creado', newUser);
        res.status(200).json({ message: 'Usuario autenticado', data: newUser });
        // res.redirect('http://localhost:4200/dashboard');
      } else {
        res.status(200).json({ message: 'Usuario ya existe ', data: usuario });
        // res.redirect('http://localhost:4200/dashboard');
      }
    }
  } catch (error) {
    console.error('Error al intercambiar el código de autorización:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const exchangeCode = async (code) => {
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  try {
    const data = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const response = await axios.post(`${baseUrl}/oauth2/token`, data, {
      headers,
      auth: { username: CLIENT_ID, password: CLIENT_SECRET }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUser = async ({ token }) => {
  try {
    const response = await axios.get(`${baseUrl}/users/@me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
};

const registerSorteo = async ( req, res )=>{
  try {
    const listGuilds = [];
    listGuilds = await getListGuilds(token);

    if (!(listGuilds.length > 0)) return;

    if (isExistsInServer(listGuilds)) {
      // Guardar en DB al usuario
      res.json(true);
    }else{
      res.json(false);
    }

  } catch (error) {
    throw error;
  }
}

const isExistsInServer = ( listGuilds ) =>{
  listGuilds.forEach(server => {
    if (server.id === idServerDevtalles) {
      return true;
    }
  });

  return false;
}

const getListGuilds = async ( token )=>{
  try {
    const response = await axios.get(`${baseUrl}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = { authAcount, registerSorteo };
