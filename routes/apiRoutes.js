const express = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const router = express.Router();

// Auth
router.post('/register', authController.register);
router.post('/login', authController.login);

// Post
router.get(['/posts', '/posts/search', '/:id_category/posts'], postController.index);
router.post('/posts', postController.createPost);
router.get('/posts/:id', postController.editPost);
router.patch('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

// Comment
router.get('/posts/:id_post/comments', commentController.detailPost);
router.post('/posts/:id_post/comments', commentController.createComment);
router.patch('/posts/:id_post/comments/:id_comment', commentController.updateComment);
router.delete('/posts/:id_post/comments/:id_comment', commentController.deleteComment);
module.exports = router;
