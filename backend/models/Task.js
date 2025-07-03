import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: Date,
  status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
}, {
  timestamps: true
});

export default mongoose.model('Task', taskSchema);
