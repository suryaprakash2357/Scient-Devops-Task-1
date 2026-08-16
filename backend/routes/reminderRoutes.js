const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { triggerReminders } = require('../controllers/reminderController');

router.post('/trigger', auth, triggerReminders);

module.exports = router;
