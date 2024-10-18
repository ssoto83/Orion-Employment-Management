import React from 'react';
import Header from '../components/Header';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'Home.css';
import Navbar from '../components/Navbar';
import LoginPage from './LoginPage';
import 'Home.css';

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
