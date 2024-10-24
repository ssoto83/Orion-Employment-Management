import { AppBar, Toolbar, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo section */}
        <Box display="flex" alignItems="center">
          {/* Direct reference to the logo */}
          <img
            src='./orion_logo.png'
            alt='Orion Employee Management Logo'
            onClick={() => window.location.href = '/Home'}
            style={{ width: '150px', height: 'auto', cursor: 'pointer' }}
          />
        </Box>

        {/* Menu or login section */}
        <Box>
          <Button color="inherit">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
