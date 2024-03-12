"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: false },
  createAt: { type: Date, default: Date.now, require: true },
});

module.exports = mongoose.model("usuario", UsuarioSchema);