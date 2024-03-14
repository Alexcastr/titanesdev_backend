const {getListGuilds, isExistsInServer} = require('./guildsController');

const registerSorteo = async ( req, res )=>{
  try {
    const { authorization } = req.headers;

    const token = authorization.split(' ')[1];
    const listGuilds = await getListGuilds(token);
    
    if (!(listGuilds.length > 0)) return;

    if (isExistsInServer(listGuilds)) {
      // Guardar en DB al usuario
      res.send(false);
    }else{
      console.log(false);
      res.send(false);
    }

  } catch (error) {
    // throw error;
  }
}

module.exports = registerSorteo;