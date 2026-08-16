const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getMeetings, createMeeting } = require('../controllers/meetingController');

router.get('/', auth, getMeetings);
router.post('/', auth, createMeeting);

module.exports = router;
