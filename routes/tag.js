const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController.js');

// Middleware (optional)
const { verifyToken } = require('../services/jwtServices.js');
const { onlyAdmin } = require('../middleware/roleMiddleware');
const { createTagValidator } = require('../validators/tagValidator.js');

// Routes
router.get('/', verifyToken, onlyAdmin, tagController.getAll);
router.get('/:id', verifyToken, onlyAdmin, tagController.getById);
router.post('/', verifyToken, onlyAdmin, createTagValidator, tagController.create);
router.put('/:id', verifyToken, onlyAdmin, tagController.update);
router.delete('/:id', verifyToken, onlyAdmin, tagController.remove);

module.exports = router;