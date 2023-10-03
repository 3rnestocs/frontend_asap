import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

function HomeListItem({ name, icon, color = '#20528E', onTap }) {
  const iconStyle = {
    color: color,
  };

  const handleClick = () => {
    if (onTap) {
      onTap();
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon style={iconStyle}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}

export default HomeListItem;
