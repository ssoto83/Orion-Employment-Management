//Rachel's version of the RequestTimeOff component
import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { Button } from '@mui/material';
import 'react-calendar/dist/Calendar.css';

const RequestTimeOff = ({ onRequest }) => {
  const [dates, setDates] = useState([]);

  const handleDateChange = (value) => {
    setDates(value);
  };

  const handleSubmit = () => {
    onRequest(dates);
  };

  return (
    <div>
      <h2>Request Time Off</h2>
      <Calendar onChange={handleDateChange} selectRange />
      <Button onClick={handleSubmit} variant='contained'>
        Submit Time Off Request
      </Button>
    </div>
  );
};

export default RequestTimeOff;
