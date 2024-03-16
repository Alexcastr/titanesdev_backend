'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const PremioSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  sorteo: { type: mongoose.Schema.Types.ObjectId, ref: 'Sorteo' },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  }, // Referencia al ganador (usuario)
  prize: String
});

module.exports = mongoose.model('premio', PremioSchema);
