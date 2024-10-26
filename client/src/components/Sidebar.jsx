import React from 'react';
import { List, ListItem, ListItemText, Drawer, Divider, Typography, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ menuItems }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}
    >
      <div>
        <Typography variant="h6" align="center" sx={{ padding: 2 }}>
          Dashboard Menu
        </Typography>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton key={index} component={Link} to={item.link}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;