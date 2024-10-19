import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { Button, TextField, Box } from '@mui/material';
import 'react-calendar/dist/Calendar.css';
import '../index.css';

// Define the EmployeeEvents component
const CompanyEvents = ({ events, onEventSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventPhoto, setEventPhoto] = useState(null);

  // Handle photo upload
  const handlePhotoChange = (e) => {
    setEventPhoto(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('date', selectedDate.toISOString()); // Format date
    formData.append('name', eventName);
    formData.append('photo', eventPhoto);

    // Submit the form data to the parent component or server
    onEventSubmit(formData);

    // Clear the form after submission
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setEventName('');
    setEventPhoto(null);
  };

  return (
    <div>
      <h1>Employee Events</h1>
      <h2>Upcoming Events</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} />

      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label='Event Name'
          fullWidth
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          margin='normal'
          required
        />
        <Button variant='contained' component='label'>
          Upload Event Photo
          <input type='file' hidden onChange={handlePhotoChange} />
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit Event
        </Button>
      </Box>

      <div className='event-list'>
        {events.map((event) => (
          <div key={event.id}>
            <h3>{event.name}</h3>
            <p>{new Date(event.date).toDateString()}</p>
            {event.photo && (
              <img
                src={URL.createObjectURL(event.photo)}
                alt='Event'
                style={{ width: '100px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyEvents;
