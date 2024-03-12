import express from 'express';
import { register, login, lista } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/authentication.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/lista', authMiddleware, lista);

export default router;
