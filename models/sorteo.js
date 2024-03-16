const mongoose = require('mongoose');

// Define el esquema para la colección Sorteo
const SorteoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imagenes: [{ type: Object, required: false }],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', unique: true, required: false }
  ], // Referencia a la colección de usuarios
  premios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Premio', required: false }], // Referencia a la colección de premios
  winners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      default: null, required: false
    }
  ], // Referencia a los ganadores (usuarios)
  prize: { type: String, required: true },
  location: { type: String, required: false },
  tags: [{ type: String, required: false }]
});

// Crea el modelo a partir del esquema
const SorteoModel = mongoose.model('sorteo', SorteoSchema);

module.exports = SorteoModel;
