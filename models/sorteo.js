const mongoose = require('mongoose');

// Define el esquema para la colección "raffle"
const SorteoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }], // Referencia a la colección de usuarios
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  }, // Referencia al ganador (usuario)
  prize: String,
  location: String,
  tags: [{ type: String }]
});

// Crea el modelo a partir del esquema
const SorteoModel = mongoose.model('sorteo', SorteoSchema);

module.exports = SorteoModel;
