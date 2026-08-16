const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  type: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reminder', ReminderSchema);
