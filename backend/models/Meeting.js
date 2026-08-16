const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  agenda: String,
  dateTime: { type: Date, required: true },
  participants: [{ type: String }],
  recurring: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Meeting', MeetingSchema);
