'use strict';

const express = require('express');
const app = express();
app.use(express.json());
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
//const port = process.env.PORT || 4201;
const server = require('http').createServer(app);

const usuario_route = require('./routes/usuario');
const admin_route = require('./routes/admin');
const config_route = require('./routes/config');
const sorteo_route = require('./routes/sorteo');
const discord_api = require('./routes/api-discord/authorize');

mongoose.connect(
  'mongodb+srv://titanes_dev:qqc7h6GlJNESdqn3@titanes_db.drxgzvy.mongodb.net/sorteo',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

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

server.listen(3000, () => {
  console.log('Server is running at port' + 3000);
});
module.exports = app;
