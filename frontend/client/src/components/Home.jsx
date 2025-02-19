import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Task Manager App made by Vivek Sharma</h1>
        <p className="text-lg text-gray-600 mb-6">Manage your tasks efficiently and stay organized!</p>

        <div className="space-y-4">
          <Link to="/register" className="block bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Register</Link>
          <Link to="/login" className="block bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
