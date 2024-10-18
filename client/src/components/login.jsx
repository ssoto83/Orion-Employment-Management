import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const Login = ({ title, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input fields
    if (!email || !password) {
      setError('Email and Password are required.');
      return;
    }

    try {
      const token = await Auth.login(email, password);

      // If login is successful, simulate storing the token and role
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem(
          'role',
          title === 'Employee Login' ? 'employee' : 'user'
        );
        onLogin(); // Call the onLogin function passed as a prop
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (err) {
      setError('Invalid email or password.'); // Handle login error
    }
  };

  return (
    <Box
      className='login-form'
      sx={{
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '20px',
      }}
    >
      <h2>{title}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}{' '}
      {/* Display error if present */}
      <form onSubmit={handleSubmit}>
        <TextField
          label='Email'
          variant='outlined'
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin='normal'
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin='normal'
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          sx={{ marginTop: '10px' }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
