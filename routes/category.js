const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');

// Middleware (optional)
const { verifyToken } = require('../services/jwtServices.js');
const { onlyAdmin } = require('../middleware/roleMiddleware.js');
const { createCategoryValidator } = require('../validators/categoryValidator.js');

// Routes
router.get('/', categoryController.getAll);
router.get('/:id',verifyToken, onlyAdmin, categoryController.getById);
router.post('/', verifyToken, onlyAdmin, createCategoryValidator, categoryController.create);
router.put('/:id',verifyToken, onlyAdmin, categoryController.update);
router.delete('/:id',verifyToken, onlyAdmin, categoryController.remove);

module.exports = router;