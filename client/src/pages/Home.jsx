import React from 'react';
import '../index.css';
import { Box } from '@mui/material';
import Login from '../components/Login';
//import LoginPage from './LoginPage';

//import { useNavigate } from 'react-router-dom';

const Home = () => {
  //const navigate = useNavigate();

  return (
    <Box className='homepage'>
      <Login />
    </Box>
  );
};

export default Home;
