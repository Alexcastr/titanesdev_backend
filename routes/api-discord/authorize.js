import express from 'express';
import { login } from "../../controllers/api-discord/authorize.controller.js";

const router = express.Router();

// router.get('/authorize', authorize);
router.get('/login', login );

export default router;
