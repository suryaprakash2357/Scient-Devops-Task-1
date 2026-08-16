const Task = require('../models/Task');
const Reminder = require('../models/Reminder');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendReminderEmail(task, type) {
  const leads = await User.find({ role: 'lead' });
  if (!leads.length) return;
  const subject = `Reminder: Task "${task.title}" ${type}`;
  const html = `
    <h3>Task: ${task.title}</h3>
    <p>Deadline: ${new Date(task.deadline).toLocaleString()}</p>
    <p>Status: ${task.status}</p>
    <p><a href="http://localhost:5000/task/${task._id}">View Task</a></p>
  `;
  for (const lead of leads) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: lead.email,
      subject,
      html,
    });
  }
  await Reminder.create({ taskId: task._id, type });
}

exports.triggerReminders = async (req, res) => {
  try {
    const now = new Date();
    const tasks = await Task.find({ status: { $ne: 'Done' } });
    for (const task of tasks) {
      if (!task.deadline) continue;
      const diff = (task.deadline - now) / (1000 * 60 * 60 * 24);
      let type = '';
      if (diff <= 0) type = 'Overdue';
      else if (diff <= 1) type = 'Due in 1 day';
      else if (diff <= 3) type = 'Due in 3 days';
      else continue;

      const existing = await Reminder.findOne({
        taskId: task._id,
        type,
        timestamp: { $gte: new Date(now.setHours(0,0,0,0)) }
      });
      if (existing) continue;

      await sendReminderEmail(task, type);
    }
    res.json({ message: 'Reminders processed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
