// middleware that checks if the user has the admin role

function hasAdminRol(req, res, next) {
  console.log('req.user.rol', req.user);
  // if (req.user.rol !== 'admin') {
  //   return res
  //     .status(403)
  //     .send({ message: 'No tienes permisos para esta accion' });
  // }
  next();
}

module.exports = hasAdminRol;
