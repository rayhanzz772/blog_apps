const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { createUserValidator } = require('../validators/UserValidator');

// buat user (debugging)
router.post('/create/user', createUserValidator, userController.createUser);
router.get('/get/user', userController.getUser);

module.exports = router;