import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Drawer, 
  Divider, 
  Typography, 
  ListItemButton,
  ListItemIcon,
  Avatar,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
// Import MUI icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';

const handleLogout = () => {
  Auth.logout();
};

const getIcon = (name) => {
  const iconMap = {
    'Dashboard': <DashboardIcon />,
    'Users': <PeopleIcon />,
    'Reports': <DescriptionIcon />,
    'Analytics': <BarChartIcon />,
    'Settings': <SettingsIcon />,
    'default': <DescriptionIcon />
  };
  return iconMap[name] || iconMap.default;
};

const Sidebar = ({ menuItems, user }) => {
  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#f8f9fa',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header with User Info */}
        <Box 
          sx={{ 
            p: 2,
            backgroundColor: 'primary.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: 'primary.light',
              width: 40,
              height: 40,
              border: '2px solid white'
            }}
          >
            {getInitials(user?.name || 'U')}
          </Avatar>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {user?.name || 'User'}
          </Typography>
        </Box>

        <Divider />

        {/* Menu Items */}
        <List sx={{ flexGrow: 1, pt: 2 }}>
          {menuItems.map((item, index) => (
            <ListItemButton
              key={index}
              component={Link}
              to={item.link}
              sx={{
                mb: 0.5,
                mx: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemIcon>
                {getIcon(item.name)}
              </ListItemIcon>
              <ListItemText 
                primary={item.name}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}
              />
            </ListItemButton>
          ))}
        </List>

        {/* Logout Section */}
        <Divider />
        <ListItemButton
          component={Link}
          to="/login"
          onClick={handleLogout}
          sx={{
            m: 1,
            borderRadius: 1,
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'error.lighter',
            }
          }}
        >
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            primaryTypographyProps={{
              color: 'error.main',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          />
        </ListItemButton>

        {/* Footer with Email */}
        <Box 
          sx={{ 
            p: 2, 
            borderTop: 1, 
            borderColor: 'divider',
            backgroundColor: 'background.paper'
          }}
        >
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              display: 'block',
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {user?.email || 'user@example.com'}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;