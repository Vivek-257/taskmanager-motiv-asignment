
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import Home from './components/Home';
import TaskPage from './components/Tasks';
import UserTasks from './components/UserTasks';


function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/user-tasks" element={<UserTasks />} /> 
        

      </Routes>
    </Router>
  );
}

export default App;

