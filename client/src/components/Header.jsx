import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Auth from '../utils/auth';

const Header = () => {
  if (!Auth.loggedIn()) {
    return (
      <Box>
        <Navbar />
      </Box>
    );
  }
};

export default Header;
