import React from 'react';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import LoginPage from './LoginPage';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
