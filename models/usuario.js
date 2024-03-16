'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Debe tener un nombre'],
    minLength: 3
  },
  discordId: { type: String, required: true },
  avatar: { type: String, required: true },
  telefono: { type: String, required: false },
  rol: { type: String, enum: ['admin', 'user'], default: 'user' },
  sorteos: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Sorteo', unique: true }
  ],
  premios: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Premio', unique: true }
  ],
  createAt: { type: Date, default: Date.now, require: true }
});

module.exports = mongoose.model('usuario', UsuarioSchema);
