const axios = require('axios');
const dotenv = require('dotenv').config();

const baseUrl = 'https://discord.com/api/v10';
const redirectUri = 'http://localhost:3000/api/discord/authorize';

const exchangeCode = async (code) => {
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  try {
    const data = new URLSearchParams({
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': redirectUri
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const response = await axios.post(`${baseUrl}/oauth2/token`, data, { headers, auth: { username: CLIENT_ID, password: CLIENT_SECRET } });

    return response.data;
  } catch (error) {
    throw error;
  }
};


const authAcount = async (req, res) => {
  try {
    const { code } = req.query;
    const tokenResponse = await exchangeCode(code);
    
    const { access_token } = tokenResponse;

    res.redirect(`http://localhost:4200/dashboard?token=${access_token}`);
  } catch (error) {
    console.error('Error al intercambiar el código de autorización:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { authAcount };