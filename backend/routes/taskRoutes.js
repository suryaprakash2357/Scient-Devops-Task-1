const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks, createTask, updateStatus, addComment } = require('../controllers/taskController');

router.get('/', auth, getTasks);
router.post('/', auth, createTask);
router.patch('/:id/status', auth, updateStatus);
router.post('/:id/comments', auth, addComment);

module.exports = router;
