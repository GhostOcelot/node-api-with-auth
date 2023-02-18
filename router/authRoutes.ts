import { Router } from 'express';
import authControllers from '../controllers/authController';

export const router = Router();

const { signUp, login, refreshToken, logout } = authControllers;

router.get('/signup', signUp);
router.get('/login', login);
router.get('/refresh-token', refreshToken);
router.get('/logout', logout);
