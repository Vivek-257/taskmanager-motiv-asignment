



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const fetchUserTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/user', {
        withCredentials: true, 
      });

      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching tasks');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      fetchUserTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      localStorage.removeItem('token'); 
      navigate('/login'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) return <div className="text-center text-lg">Loading tasks...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">My Tasks</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="mb-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-gray-700">{task.description}</p>
                <span className="block mt-2 text-sm text-gray-500">
                  Priority: <b>{task.priority}</b>
                </span>
              </div>

              <select
                value={task.status}
                onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks assigned.</p>
        )}
      </div>
    </div>
  );
};

export default UserTasks;
