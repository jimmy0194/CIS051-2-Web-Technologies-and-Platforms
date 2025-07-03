import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks =
      req.user.role === 'admin'
        ? await Task.find({}).populate('assignedTo', 'name')
        : await Task.find({ assignedTo: req.user._id }).populate('assignedTo', 'name');

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req, res) => {
  const { title, description, dueDate, assignedTo } = req.body;

  const task = new Task({
    title,
    description,
    dueDate,
    assignedTo: assignedTo || req.user._id,
  });

  await task.save();
  res.status(201).json(task);
};

export const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (task.assignedTo.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  task.status = status;
  await task.save();
  res.json(task);
};
