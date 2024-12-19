import express from 'express';
import { createPost, getAllPosts } from '../controller/postController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();
router.get('/',verifyToken,getAllPosts)
router.post('/',verifyToken,createPost)

export default router;