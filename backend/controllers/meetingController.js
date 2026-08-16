const Meeting = require('../models/Meeting');

exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ dateTime: 1 });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMeeting = async (req, res) => {
  try {
    const { title, agenda, dateTime, participants, recurring } = req.body;
    const meeting = new Meeting({
      title,
      agenda,
      dateTime,
      participants: participants || [],
      recurring: recurring || false
    });
    await meeting.save();
    res.status(201).json(meeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
