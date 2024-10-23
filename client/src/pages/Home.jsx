import React from 'react';
import '../index.css';
import { Box } from '@mui/material';
import Login from '../components/Login';

const Home = () => {
  return (
    <Box className='homepage'>
      <Login />
    </Box>
  );
};

export default Home;
