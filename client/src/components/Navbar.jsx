import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user's session (e.g., remove token)
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    onLogout(); // Call the logout function passed as a prop
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <h1>NavBar</h1>
    <Box>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Link
          to='/employee-dashboard'
          style={{ color: '#f57369', margin: '0 15px' }}
        >
          Employee Dashboard
        </Link>
        <Link
          to='/employee-events'
          style={{ color: '#f57369', margin: '0 15px' }}
        >
          Employee Events
        </Link>
        {!isLoggedIn ? (
          <Link to='/login' style={{ color: '#f57369', margin: '0 15px' }}>
            Log In
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              color: '#f57369',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            Log Out
          </button>
        )}
      </nav>
    </Box>
  );
};

export default Navbar;
