import express from 'express';
import authRouter from './routes/auth.js';
import discordRouter from './routes/api-discord/authorize.js';
import cors from "cors";

import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/auth', authRouter);
app.use( '/authorize-acount', discordRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
