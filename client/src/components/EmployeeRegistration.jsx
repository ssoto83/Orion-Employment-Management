import { useMutation } from '@apollo/client';
import { SIGNUP } from '../utils/mutations';
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Employee } from '../../../server/models';

const EmployeeRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [signup, { error }] = useMutation(SIGNUP);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({
        variables: { ...formData },
      });

      if (data.signup.token) {
        localStorage.setItem('token', data.signup.token);
        window.location.assign('/dashboard');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          name='firstName'
          placeholder='First Name'
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          name='lastName'
          placeholder='Last Name'
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name='password'
          placeholder='Password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type='submit'>Sign Up</button>
        {error && <p>Error creating account</p>}
      </form>
    </Box>
  );
};

export default EmployeeRegistration;
