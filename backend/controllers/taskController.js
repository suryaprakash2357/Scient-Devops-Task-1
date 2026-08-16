const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignees, priority, deadline, tags } = req.body;
    const task = new Task({
      title,
      description,
      assignees: assignees || [],
      priority,
      deadline,
      tags: tags || [],
      status: 'Pending',
      auditTrail: [{ user: req.user.name, from: '—', to: 'Pending', note: 'Task created' }]
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    const oldStatus = task.status;
    task.status = status;
    task.auditTrail.push({
      user: req.user.name,
      from: oldStatus,
      to: status,
      note: note || ''
    });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.comments.push({ user: req.user.name, text });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
