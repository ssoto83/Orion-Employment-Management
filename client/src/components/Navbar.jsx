import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (auth !== null) {
      setIsLoaded(true);
    }
  }, [auth]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.logout();
    handleClose();
    navigate('/login');
  };

  if (!isLoaded) {
    return null; // or a loading indicator
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <img
            src='/orion_logo.png'
            alt='Orion Employee Management Logo'
            onClick={() => navigate('/')}
            style={{ width: '150px', height: 'auto', cursor: 'pointer' }}
          />
        </Box>

        <Box>
          {!auth.isAuthenticated ? (
            <Box>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
              >
                Login/Signup
              </Button>
            </Box>
          ) : (
            <Box>
              <Button 
                color="inherit" 
                component={Link} 
                to={auth.userRole === 'admin' ? '/admin' : '/employee-dashboard'}
                sx={{ mr: 2 }}
              >
                Dashboard
              </Button>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <UserCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
