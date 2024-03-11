import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', true);

const UserSchema = new mongoose.Schema({
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

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.username, email: this.email, rol: this.rol },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME
    }
  );
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

const User = mongoose.model('User', UserSchema);

export default User;
