import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from '../api/axios';

function AdminPanel() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
  });

  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await axios.get('/auth/users');
      setStudents(res.data);
    } catch {
      alert('Failed to load students');
    }
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data);
    } catch {
      alert('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      await axios.post('/tasks', form);
      setForm({ title: '', description: '', dueDate: '', assignedTo: '' });
      await fetchTasks();
    } catch {
      setError('Error creating task');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mt-5">
      <Header />
      <h2 className="mb-4">Admin Panel: Create New Task</h2>

      {creating && (
        <div className="alert alert-info" role="alert">
          Creating task...
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form className="row g-3 mb-5" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Description</label>
          <input
            className="form-control"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Assign To</label>
          <select
            className="form-select"
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            required
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">
            Create Task
          </button>
        </div>
      </form>

      <h4 className="mb-3">All Tasks</h4>
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.assignedTo?.name || 'N/A'}</td>
              <td>
                <span
                  className={`badge ${
                    t.status === 'completed'
                      ? 'bg-success'
                      : t.status === 'in progress'
                      ? 'bg-info text-dark'
                      : 'bg-secondary'
                  }`}
                >
                  {t.status}
                </span>
              </td>
              <td>{t.dueDate ? t.dueDate.split('T')[0] : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
