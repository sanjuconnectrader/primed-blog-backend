import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// Create a new blog post
router.post('/', upload, createBlog);

// Get all blog posts
router.get('/', getAllBlogs);

// Get a single blog post by ID
router.get('/:id', getBlogById);

// Update a blog post
router.put('/:id', upload, updateBlog);

// Delete a blog post
router.delete('/:id', deleteBlog);

export default router;