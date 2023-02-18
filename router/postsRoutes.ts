import { Router } from 'express';
import postsControllers from '../controllers/postsController';
import authMiddleware from '../middleware/authMiddleware';

export const router = Router();

const { verifyJWTToken } = authMiddleware;

const { getPosts, getPostById, createPost, deletePost, editPost, uploadFile } = postsControllers;

router.get('/posts', verifyJWTToken, getPosts);
router.get('/post', verifyJWTToken, getPostById);
router.post('/post', verifyJWTToken, createPost);
router.delete('/post/:id', verifyJWTToken, deletePost);
router.put('/post/:id', verifyJWTToken, editPost);
router.post('/upload-file', uploadFile);
