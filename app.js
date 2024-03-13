'use strict';

const express = require('express');
const app = express();
app.use(express.json());
// dotenv
require('dotenv').config();

const bodyparser = require('body-parser');
const mongoose = require('mongoose');
//const port = process.env.PORT || 4201;
const server = require('http').createServer(app);

var io = require('socket.io')(server, {
  cors: { origin: '*' }
});

// Define una variable para almacenar la lista de usuarios
let usuarios = [];

// Escucha la conexión de un cliente
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Emite la lista de usuarios cuando un cliente se conecta
  socket.emit('user-list', usuarios);

  // Maneja la desconexión de un cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  // Maneja la solicitud de lista de usuarios
  socket.on('get-user-list', () => {
    socket.emit('user-list', usuarios);
  });

  // Maneja la eliminación de un usuario
  socket.on('delete-user', (userId) => {
    // Elimina el usuario de la lista
    usuarios = usuarios.filter(user => user.id !== userId);
    // Emite la lista actualizada de usuarios a todos los clientes conectados
    io.emit('user-list', usuarios);
  });

  // Otros eventos y lógica de la aplicación aquí...
});


const usuario_route = require('./routes/usuario');
const admin_route = require('./routes/admin');
const config_route = require('./routes/config');
const sorteo_route = require('./routes/sorteo');
const discord_api = require('./routes/api-discord/discord');
const { listaAdmin } = require('./controllers/adminController');

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

server.listen(3000, () => {
  console.log('Server is running at port' + 3000);
});
module.exports = app;
