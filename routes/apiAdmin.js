const express = require('express');
const authController = require('../controllers/authController');
// const postController = require('../controllers/postController');
// const commentController = require('../controllers/commentController');
// userController
const userController = require('../controllers/userController');
const { checkadmin } = require('../middleware/authMiddleware');

// Midllware
const router = express.Router();

// Auth
router.post('/login', authController.login); // OK
// User

// *** Vì không lưu đc trạng thái đăng nhập nên cần login cho mỗi chức năng
// router.get('/admin/profile', checkadmin, userController.infox) // Lỗi
router.get('/users', checkadmin, userController.listUser);
// specific infouser
router.get('/users/1', checkadmin, userController.listUser);

module.exports = router;
