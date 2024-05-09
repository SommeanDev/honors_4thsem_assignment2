import { Router } from 'express';
import { createPost, getPost, getPosts, updatePost, deletePost } from '../controllers/posts-controller.js';
import { authCheck, authAdminCheck } from '../middleware/auth.js';
import { check, param } from 'express-validator';
import validateInput from '../middleware/validate.js';
import fileUpload from '../middleware/file-upload.js';

const postsRouter = Router();

// Create a new post
postsRouter.post(
  '/',
  [
    check('author').not().isEmpty(),
    check('title').not().isEmpty(),
    check('content').not().isEmpty(),
  ],
  createPost
);

// Get a post by ID
postsRouter.get('/:id', param('id').isAlphanumeric(), validateInput, getPost);

// Get all posts
postsRouter.get('/', getPosts);

// Update a post
postsRouter.patch(
  '/:id',
  param('id').isAlphanumeric(),
  validateInput,
  authCheck,
  updatePost
);

// Delete a post
postsRouter.delete(
  '/:id',
  param('id').isAlphanumeric(),
  validateInput,
  authCheck,
  authAdminCheck,
  deletePost
);

export default postsRouter;