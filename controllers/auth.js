import User from '../models/User.js';
import { connect, disconnect } from '../db.js';
const register = async (req, res) => {
  try {
    await connect();

    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    await disconnect();

    res.status(201).json({ user: { name: user.username }, token });
  } catch (error) {
    await disconnect();
    console.error(error);
    res.status(500).send('Error registering user');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // revisar si el usuario existe
  // revisar si el password es correcto
  // generar un token
  // enviar el token
  try {
    await connect();

    const user = await User.findOne({ email });

    if (!user) {
      await disconnect();
      return res.status(400).send('User not found');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      await disconnect();
      return res.status(400).send('Invalid password');
    }

    const token = user.createJWT();

    res.status(200).json({ user: { name: user.username,email: user.email }, token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
};

export { register, login };
