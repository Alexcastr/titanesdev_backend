// middleware that checks if the user has the admin role
const jwt = require('jwt-simple');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
function hasAdminRol(req, res, next) {
  const authHeader = req.headers.authorization;

  // console.log('authorization', authHeader);
  if (!authHeader) {
    return res.status(403).send({ message: 'NoHeadersError' });
  }

  if (authHeader.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Discord User can not access' });
  }

  const segment = authHeader.split('.');
  // const segment = authHeader.split(' ')[1];

  if (segment.length !== 3) {
    return res.status(403).send({ message: 'InvalidToken' });
  }

  try {
    const payload = jwt.decode(authHeader, secret);

    if (payload.rol !== 'admin') {
      return res
        .status(403)
        .send({ message: 'No tienes permisos para esta accion' });
    }
  } catch (error) {
    return res.status(403).send({ message: 'InvalidHeader' });
  }

  next();
}

module.exports = hasAdminRol;
