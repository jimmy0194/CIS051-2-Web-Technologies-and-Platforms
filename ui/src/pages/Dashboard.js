import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Header from '../components/Header';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data);
    } catch {
      alert('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmitTask = async (id) => {
    setSubmitting(true);
    try {
      await axios.put(`/tasks/${id}`, { status: 'completed' });
      await fetchTasks();
    } catch {
      alert('Failed to update task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <Header />
      <h2 className="mb-4">Your Assigned Tasks</h2>

      {tasks.length === 0 ? (
        <div className="alert alert-warning">No tasks assigned yet.</div>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <span className={`badge ${
                    task.status === 'completed' ? 'bg-success' :
                    task.status === 'in progress' ? 'bg-info text-dark' :
                    'bg-secondary'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td>{task.dueDate ? task.dueDate.split('T')[0] : 'N/A'}</td>
                <td>
                  {task.status !== 'completed' && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleSubmitTask(task._id)}
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Mark as Completed'}
                    </button>
                  )}
                  {task.status === 'completed' && (
                    <span className="text-success">✔ Submitted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
