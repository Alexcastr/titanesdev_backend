const mongoose = require('mongoose');

// Define el esquema para la colección Sorteo
const SorteoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', unique: true }
  ], // Referencia a la colección de usuarios
  premios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Premio' }], // Referencia a la colección de premios
  winners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      default: null
    }
  ], // Referencia a los ganadores (usuarios)
  prize: String,
  location: String,
  tags: [{ type: String }]
});

// Crea el modelo a partir del esquema
const SorteoModel = mongoose.model('sorteo', SorteoSchema);

module.exports = SorteoModel;
