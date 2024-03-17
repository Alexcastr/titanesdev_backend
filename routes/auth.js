const router = require('express').Router();
const passport = require('passport');
const isAuthtorized = require('../middlewares/isAuthorizedUser');

router.get('/login-usuario', passport.authenticate('discord'));

router.get(
  '/redirect',
  passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: 'http://localhost:4200/panel-user/list-sorteos'
  }),
  async (req, res) => {
    const user = req.user;
    console.log('user: ', user);
    res.send({ message: 'user logged in', data: user });
  }
);

router.get('/logout', async (req, res) => {
  console.log('entre en el logout');
  if (req.user) {
    req.logout();
    res.redirect('http://localhost:4200/login-usuario');
  } else {
    res.redirect('http://localhost:4200/login-usuario');
  }
});

module.exports = router;
