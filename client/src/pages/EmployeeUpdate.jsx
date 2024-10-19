import React { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { GET_EMPLOYEES } from "../utils/queries";

const EmployeeUpdate = ({ employeeData, onUpdate }) => {
  const [formData, setFormData] = useState(employeeData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated data to the server
    onUpdate(formData);
  };

  return (
    <h1>Employee Update</h1>
    <Box sx={{ padding: '20px' }}>
      <h2>View and Update Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Disabled Fields */}
        <TextField
          name='firstName'
          label='First Name'
          variant='outlined'
          fullWidth
          value={formData.firstName}
          disabled
          margin='normal'
        />
        <TextField
          name='lastName'
          label='Last Name'
          variant='outlined'
          fullWidth
          value={formData.lastName}
          disabled
          margin='normal'
        />
        <TextField
          name='email'
          label='Email'
          variant='outlined'
          fullWidth
          value={formData.email}
          disabled
          margin='normal'
        />
        <TextField
          name='position'
          label='Position'
          variant='outlined'
          fullWidth
          value={formData.position}
          disabled
          margin='normal'
        />

        {/* Editable Fields */}
        <TextField
          name='address'
          label='Address'
          variant='outlined'
          fullWidth
          value={formData.address}
          onChange={handleChange}
          margin='normal'
        />
        <TextField
          name='phoneNumber'
          label='Phone Number'
          variant='outlined'
          fullWidth
          value={formData.phoneNumber}
          onChange={handleChange}
          margin='normal'
        />

        <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
          Update Information
        </Button>
      </form>
    </Box>
  );
};

export default EmployeeUpdate;
