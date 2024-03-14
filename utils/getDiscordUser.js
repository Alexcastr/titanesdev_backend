const axios = require('axios');
require('dotenv').config();

const { BASE_DISCORD_URL } = process.env;

const getDiscordUser = async ({ token }) => {
  try {
    const response = await axios.get(`${BASE_DISCORD_URL}/users/@me`, {
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

module.exports = getDiscordUser;
