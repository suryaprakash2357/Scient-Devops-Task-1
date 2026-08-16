const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignees: [{ type: String }],
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  deadline: Date,
  tags: [String],
  status: { type: String, enum: ['Pending', 'In Progress', 'Blocked', 'Done'], default: 'Pending' },
  auditTrail: [{
    user: String,
    from: String,
    to: String,
    note: String,
    timestamp: { type: Date, default: Date.now }
  }],
  comments: [{
    user: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
