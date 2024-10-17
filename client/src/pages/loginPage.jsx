import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import '../App.css';


const LoginPage = () => {
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = (role) => {
    // Simulate login process
    if (role === 'employee') {
      localStorage.setItem('token', 'employeeToken'); // Simulate storing a token
      localStorage.setItem('role', 'employee'); // Set role
      navigate('/dashboard'); // Navigate to the employee dashboard
    } else if (role === 'admin') {
      localStorage.setItem('token', 'adminToken'); // Simulate storing a token
      localStorage.setItem('role', 'user'); // Set role
      navigate('/dashboard'); // Navigate to the admin dashboard
    }
  };

  return (
    <main>
      <div className='login-boxes'>
        <Login title='Employee Login' onLogin={() => handleLogin('employee')} />
        <Login title='HR Admin Login' onLogin={() => handleLogin('user')} />
      </div>
    </main>
  );
};

export default LoginPage;
