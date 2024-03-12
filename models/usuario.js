'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  username: { type: String, required: true },
  discordId: { type: String, required: true },
  avatar: { type: String, required: true },
  telefono: { type: String, required: false },
  rol: { type: String, enum: ['admin', 'user'], default: 'user' },
  createAt: { type: Date, default: Date.now, require: true }
});

module.exports = mongoose.model('usuario', UsuarioSchema);
