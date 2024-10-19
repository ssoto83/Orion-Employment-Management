import React { useState } from 'react';
import { Calendar } from 'react-calendar';
import { Button, TextField, Box } from '@mui/material';
import 'react-calendar/dist/Calendar.css';

const EmployeeEvents = ({ events, onEventSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventPhoto, setEventPhoto] = useState(null); // State for the photo

  const handlePhotoChange = (e) => {
    setEventPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('date', selectedDate);
    formData.append('name', eventName);
    formData.append('photo', eventPhoto);

    onEventSubmit(formData); // Pass form data (including image) to parent component or server
  };

  return (
    <h1>Employee Events</h1>
    <div>
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

export default EmployeeEvents;
