'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const PremioSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Debe tener un nombre'],
    minLength: 3
  },
  imagenes: [{ type: Object, required: false }],
  description: String,
  startDate: {
    type: Date,
    required: [false, 'Define fecha disponibilidad del premio']
  },
  endDate: {
    type: Date,
    required: [false, 'Define fecha de expiración del premio']
  },
  sorteo: { type: mongoose.Schema.Types.ObjectId, ref: 'Sorteo' },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  }, // Referencia al ganador (usuario)
  prize: String
});

module.exports = mongoose.model('premio', PremioSchema);
