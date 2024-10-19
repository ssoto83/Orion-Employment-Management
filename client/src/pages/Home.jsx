import React from 'react';
import { Header, NavBar } from '../components/';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Header />
      <Navbar />
      <LoginPage />
    </Box>
  );
};

export default Home;
