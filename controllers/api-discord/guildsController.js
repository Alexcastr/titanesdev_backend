const axios = require('axios');

const idServerDevtalles = '1130900724499365958';
const baseUrl = 'https://discord.com/api/v10';

const getListGuilds = async ( token )=>{
  try {
    const response = await axios.get(`${baseUrl}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

const isExistsInServer = ( listGuilds ) =>{
  let isExists = false;
  listGuilds.forEach(server => {
    if (server.id === idServerDevtalles) {
      isExists = true;
    }
  });

  return isExists;
}

module.exports = { getListGuilds, isExistsInServer };