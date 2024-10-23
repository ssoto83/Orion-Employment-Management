import React from 'react';
import Navbar from './Navbar'; // Navbar with logo inside
import { Box, Container, Typography } from '@mui/material';

const Header = () => {
  return (
    <Box>
      {/* Navbar component now contains the logo */}
      <Navbar />

      {/* Any other content that follows the navbar, like a header section */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Orion Employee Management
          </Typography>
          <Typography variant="h5" component="p">
            Manage your employees efficiently with our platform.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
