import { Router } from 'express';
import { router as postsRoutes } from './postsRoutes';
import { router as tekkenRoutes } from './tekkenRoutes';
import { router as authRoutes } from './authRoutes';

const router = Router();

router.use(postsRoutes, tekkenRoutes, authRoutes);

export default router;
