import express from 'express';
import {
  createTask,
  getAllTasks,
  updateTaskStatus,
} from '../controllers/taskController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllTasks);
router.post('/', protect, createTask);
router.put('/:id', protect, updateTaskStatus);

export default router;
