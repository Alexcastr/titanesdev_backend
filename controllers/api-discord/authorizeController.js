const exchangeCode = require('../../utils/exchangeCode');
const getDiscordUser = require('../../utils/getDiscordUser');

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
      const resp = await getDiscordUser({ token: access_token });

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
        res.status(200).json({
          message: 'Usuario autenticado',
          data: newUser,
          token: access_token
        });
        // res.redirect('http://localhost:4200/dashboard');
      } else {
        res.status(200).json({
          message: 'Usuario ya existe ',
          data: usuario,
          token: access_token
        });
        // res.redirect('http://localhost:4200/dashboard');
      }
    }
  } catch (error) {
    console.error('Error al intercambiar el código de autorización:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { authAcount };
