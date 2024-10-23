import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formState, setFormState] = useState({ email: '',username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN);
  const navigate = useNavigate();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { 
          username: formState.username,
          email: formState.email,
          password: formState.password,

         },
      });

      Auth.login(data.login.token);
      navigate('/dashboard'); // Redirect to dashboard after successful login
      console.log('Logged in successfully');
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Box sx={{ maxWidth: '400px', margin: 'auto', mt: 8 }}>
      <Typography variant='h5' align='center'>
        Employee Login
      </Typography>
      <form className='login-box' onSubmit={handleFormSubmit}>
        <TextField
          className='form-input'
          label='Username'
          name='username'
          value={formState.username}
          onChange={handleChange}
          variant='outlined'
          fullWidth
          margin='normal'
          required
        />
        <TextField
          className='form-input'
          label='Email'
          name='email'
          type='email'
          value={formState.email}
          onChange={handleChange}
          variant='outlined'
          fullWidth
          margin='normal'
          required
        />
        <TextField
          className='form-input'
          label='Password'
          name='password'
          type='password'
          value={formState.password}
          onChange={handleChange}
          variant='outlined'
          fullWidth
          margin='normal'
          required
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          type='submit'
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>

      {error && (
        <Typography color='error' align='center' mt={2}>
          {error.message}
        </Typography>
      )}

      <Typography align='center' mt={2}>
        <Link href='/signup' variant='body2'>
          New Employee? Register here.
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
