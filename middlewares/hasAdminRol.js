// middleware that checks if the user has the admin role

function hasAdminRol(req, res, next) {
  if (req.user.rol !== 'admin') {
    return res
      .status(403)
      .send({ message: 'No tienes permisos para esta accion' });
  }
  next();
}
