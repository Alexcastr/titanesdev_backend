'use strict';

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const hasAdminRol = require('./middlewares/hasAdminRol');

const usuario_route = require('./routes/usuario');
const admin_route = require('./routes/admin');
const config_route = require('./routes/config');
const discord_api = require('./routes/api-discord/discord');
const authRoute = require('./routes/auth');
const sorteo_route = require('./routes/sorteo');
const premio_route = require('./routes/premio');
const server = require('http').createServer(app);

const session = require('express-session');
const passport = require('passport');
const discordStrategy = require('./routes/strategy/discordStrategy');

app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    cookie: { maxAge: 60000 * 60 * 24 }, // 1 day
    saveUninitialized: false,
    name: 'discordToken',
    resave: false
  })
);
// pasport config
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3000;

const mongo = process.env.MONGO_URI;

mongoose.connect(`${mongo}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.use('/api', usuario_route);
app.use('/api', admin_route);
app.use('/api', config_route);
app.use('/api', sorteo_route);
app.use('/api', discord_api);
app.use('/api', authRoute);
app.use('/api', premio_route);
// app.use('/api', hasAdminRol, premio_route);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
