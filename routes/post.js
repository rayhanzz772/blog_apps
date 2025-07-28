const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../services/jwtServices');
const { onlyAdmin } = require('../middleware/roleMiddleware');
const { createPostValidator } = require('../validators/postValidator');

// Untuk Admin
router.post('/', verifyToken, onlyAdmin, createPostValidator, postController.createPost);
router.put('/:id', verifyToken, onlyAdmin, postController.updatePost);
router.delete('/:id', verifyToken, onlyAdmin, postController.softDeletePost);
router.get('/admin', verifyToken, onlyAdmin, postController.getAllPostsAdmin);

// Untuk Publik (Customer)
router.get('/', postController.getPublishedPosts);
router.get('/:slug', postController.getPostBySlug);

module.exports = router;

