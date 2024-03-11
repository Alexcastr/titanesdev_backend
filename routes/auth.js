import express from 'express';
import { register, login,lista } from '../controllers/auth.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/lista', lista);

export default router;
