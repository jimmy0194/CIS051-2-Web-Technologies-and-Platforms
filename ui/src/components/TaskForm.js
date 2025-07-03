import { useState } from 'react';
import axios from '../api/axios';

function TaskForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/tasks', form);
      alert('Task created!');
    } catch (err) {
      alert('Error creating task.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <input type="date" onChange={e => setForm({ ...form, dueDate: e.target.value })} />
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;
