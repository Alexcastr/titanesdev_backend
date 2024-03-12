"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6
  },
  rol: { type: String, required: true },
  perfil: { type: String, default: 'perfil.png', required: true },
  sorteosAdministrados: { type: Number, default: 0, required: true },
  fechaRegistro: { type: Date, default: Date.now, require: true }
  //estadoCuenta: { type: Boolean, required: true },
});

module.exports = mongoose.model("admin", AdminSchema);
