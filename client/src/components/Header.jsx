import React from 'react';
import Navbar from './Navbar';
import { Box } from '@mui/material'; // Import Box from Material-UI

// The Header component takes isLoggedIn and onLogout props
const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <Box>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Direct reference to logo in the public folder */}
        <img
          src='.assets/orion_logo.png' // Use relative path to public folder
          alt='Orion Employee Management Logo'
          style={{ width: '435px', height: '125px' }}
        />
        <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />{' '}
        {/* Navbar component */}
      </header>
    </Box>
  );
};

export default Header;
