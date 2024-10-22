import React from 'react'; // Import react
import Navbar from './Navbar';
import { Box } from '@mui/material'; // Import Box from Material-UI
import Home from '../pages/Home';

// The Header component takes isLoggedIn and onLogout props
const Header = () => {
  return (
    <Box>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0px 0px',
        }}
      >
        {/* Direct reference to logo in the public folder */}
        <img
          src='./orion_logo.png'
          alt='Orion Employee Management Logo'
          onClick={() => '/Home'}
          style={{ width: '435px', height: '125px' }}
        />
        <Navbar/>
        {/* Navbar component */}
      </header>
    </Box>
  );
};

export default Header;
