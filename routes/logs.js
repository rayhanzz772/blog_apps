const express = require('express');
const router = express.Router();
const services = require('../services/logService.js');

// Routes
router.get('/', services.getAll);

module.exports = router;