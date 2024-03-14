const axios = require('axios');
require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_DISCORD_URI, BASE_DICORD_URL } =
  process.env;

const exchangeCode = async (code) => {
  try {
    const data = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_DISCORD_URI
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const response = await axios.post(
      `https://discord.com/api/v10/oauth2/token`,
      data,
      {
        headers,
        auth: { username: CLIENT_ID, password: CLIENT_SECRET }
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = exchangeCode;
