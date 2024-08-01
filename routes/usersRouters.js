const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
module.exports = router;
const upload = require('../config/update');

// Đăng ký tài khoản
//http://localhost:3000/users/register
router.post('/register', upload.single('hinh_anh'), usersController.register);

// Đăng nhập tài khoản
//http://localhost:3000/users/login
router.post('/login', usersController.login);
