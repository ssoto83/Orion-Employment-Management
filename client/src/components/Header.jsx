import React from 'react'; // Import react
import Navbar from './Navbar';
import { Box } from '@mui/material'; // Import Box from Material-UI
import Home from '../pages/Home';

// The Header component takes isLoggedIn and onLogout props
const Header = () => {
  return (
    <Box>
      <h1>Header</h1>
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
          src='/assets/orion_logo.png'
          alt='Orion Employee Management Logo'
          onClick={() => Home}
          style={{ width: '435px', height: '125px' }}
        />
        <Navbar/>
        {/* Navbar component */}
      </header>
    </Box>
  );
};

export default Header;
