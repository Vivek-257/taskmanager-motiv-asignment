

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateTask from './CreateTask';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    priority: '',
    assignedTo: '',
  });
  const navigate = useNavigate();

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', { withCredentials: true });
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching tasks');
      setLoading(false);
    }
  };

  // Fetch users for assignment dropdown
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', { withCredentials: true });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditedTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignedTo: task.assignedTo._id || '',
    });
  };

  const handleUpdate = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        editedTask,
        { withCredentials: true }
      );
      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, { withCredentials: true });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Welcome, Admin</h1>
       
      </div>

      <CreateTask refreshTasks={fetchTasks} />

      {loading && <div>Loading tasks...</div>}
      {error && <div>Error: {error}</div>}

      <div className="bg-white shadow-md rounded-lg p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="task-item mb-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center"
            >
              <div>
                {editingTaskId === task._id ? (
                  <>
                    <input
                      type="text"
                      value={editedTask.title}
                      onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                      className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                      placeholder="Title"
                    />
                    <textarea
                      value={editedTask.description}
                      onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                      className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                      placeholder="Description"
                    />
                    <select
                      value={editedTask.priority}
                      onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                      className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <select
                      value={editedTask.assignedTo}
                      onChange={(e) => setEditedTask({ ...editedTask, assignedTo: e.target.value })}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    >
                      <option value="">Select User</option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold">{task.title}</h3>
                    <p className="text-gray-700">{task.description}</p>
                    <span className="block mt-2 text-sm text-gray-500">
                      Priority: <b>{task.priority}</b>
                    </span>
                    <span className="block mt-2 text-sm text-gray-500">
                      Assigned To: {task.assignedTo?.name || 'Unassigned'}
                    </span>
                    <span className="block mt-2 text-sm text-gray-500">
                      Status: <b>{task.status}</b> 
                    </span>
                  </>
                )}
              </div>

              <div className="flex gap-2 items-center">
                {editingTaskId === task._id ? (
                  <button
                    onClick={() => handleUpdate(task._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
