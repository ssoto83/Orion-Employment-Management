import React, { useState, useEffect } from 'react';
import { TextField, Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../index.css';

const AddEmployee = ({ isEdit, employeeData, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    ssn: '',
    position: '',
    pay: '',
    startDate: null,
    photo: null, // for profile image
    ...employeeData, // populate form if editing employee
  });

  useEffect(() => {
    if (isEdit && employeeData) {
      setFormData({
        ...employeeData,
        startDate: employeeData.startDate || null,
      });
    }
  }, [isEdit, employeeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] }); // File upload handling
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit formData to backend (including the photo)
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Post form data to server
      const response = await fetch('/api/employees', {
        method: 'POST',
        body: formDataToSend, // sending form data
      });

      if (response.ok) {
        onClose(); // Close modal on success
      } else {
        console.error('Error saving employee data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving employee data:', error);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        className='employee-form'
        sx={{
          padding: '40px',
          maxWidth: '600px',
          margin: 'auto',
          marginTop: '100px',
          bgcolor: 'background.paper',
        }}
      >
        <h2>{isEdit ? 'Edit Employee' : 'Add Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name='firstName'
            label='First Name'
            variant='outlined'
            fullWidth
            value={formData.firstName}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            name='lastName'
            label='Last Name'
            variant='outlined'
            fullWidth
            value={formData.lastName}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            name='address'
            label='Address'
            variant='outlined'
            fullWidth
            value={formData.address}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            name='phoneNumber'
            label='Phone Number'
            variant='outlined'
            fullWidth
            value={formData.phoneNumber}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            name='email'
            label='Email'
            variant='outlined'
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            name='ssn'
            label='SSN'
            variant='outlined'
            fullWidth
            value={formData.ssn}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            name='position'
            label='Position'
            variant='outlined'
            fullWidth
            value={formData.position}
            onChange={handleInputChange}
            margin='normal'
          />
          <TextField
            name='pay'
            label='Pay'
            variant='outlined'
            fullWidth
            value={formData.pay}
            onChange={handleInputChange}
            margin='normal'
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Start Date'
              value={formData.startDate}
              onChange={(newValue) =>
                setFormData({ ...formData, startDate: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} fullWidth margin='normal' />
              )}
            />
          </LocalizationProvider>

          <Button
            variant='contained'
            component='label'
            fullWidth
            sx={{ marginTop: '20px' }}
          >
            Upload Profile Picture
            <input type='file' hidden onChange={handleFileChange} />
          </Button>

          <Button
            variant='contained'
            type='submit'
            fullWidth
            sx={{ marginTop: '20px' }}
          >
            {isEdit ? 'Save Changes' : 'Add Employee'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEmployee;
