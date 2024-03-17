function isAuthtorized(req, res, next) {
  if (req.user) {
    console.log('user is logged in ', req.user);
    next();
  } else {
    console.log('user is not logged in');
    res.redirect('/api/login-usuario');
  }
}

module.exports = isAuthtorized;
