const express = require('express');
const router = express.Router();
const postActivityController = require('../controllers/postActivityController');
const { onlyAdmin } = require('../middleware/roleMiddleware');
const { verifyToken } = require('../services/jwtServices.js');

router.post('/', postActivityController.trackVisit);

router.get('/:post_id', verifyToken, onlyAdmin, postActivityController.getPostActivities);

module.exports = router;
