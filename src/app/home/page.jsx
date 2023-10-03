'use client';
import { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, CssBaseline } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useRouter } from 'next/navigation';
import { useAuth, useUserSystemStore } from '@/hooks';
import Inventory from '../inventory/page';
import AddProduct from '../addProduct/page';
import { HomeListItem } from '@/components';
import { set } from 'react-hook-form';

const drawerWidth = 240;

export default function Home() {
  const router = useRouter();
  const { isAuth } = useAuth();
  const { user } = useUserSystemStore.getState();
  const logout = useUserSystemStore.getState().logout;
  const [showInventory, setShowInventory] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  // Function to switch to Inventory
  const switchToInventory = () => {
    switchToDefault();
    setShowInventory(true);
  };

  // Function to switch to ProductForm
  const switchToProductForm = () => {
    switchToDefault();
    setShowProductForm(true);
  };

  // Function to return to default content (Typography)
  const switchToDefault = () => {
    setShowProductForm(false);
    setShowInventory(false);
  };

  const handleItemClick = (index) => {

    switch (index) {
      case 1:
        switchToDefault();
        break;
        case 2:
          switchToInventory();
          break;
      case 3:
        logout();
        router.push('/login');
        break;
    }
  };

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  });

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#EEEEEE', minHeight: '100vh' }}>
      <CssBaseline />
      {/* Barra de navegacion */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#20528E' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <RestaurantMenuIcon sx={{ marginRight: '8px' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', textShadow: '1px 1px 4px black' }}>
            SISTEMA ASAP
          </Typography>
          <Typography variant="h8" component="div" sx={{ fontWeight: 'light', flex: 1, textAlign: 'center' }}>
            Bienvenido, {user && user.name ? user.name : 'Usuario'}.
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Menu lateral */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', position: 'relative' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <List>
            <HomeListItem 
            name= 'Platillos del menú'
            icon={<RestaurantRoundedIcon />}
            onTap={() => {
              handleItemClick(1);
            }}
            />
            <HomeListItem
              name='Inventarios'
              icon={<Inventory2RoundedIcon />}
              onTap={() => {
                handleItemClick(2);
              }}
            />
          </List>
          <div style={{ flex: 1 }}></div>
          <List>
            <Divider />
            <HomeListItem
              name='Cerrar sesión'
              icon={<ExitToAppRoundedIcon />}
              onTap={() => {
                handleItemClick(3);
              }}
            />
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {showInventory ? (
          <Inventory onAddProduct={switchToProductForm} />
        ) : showProductForm ? (
          <AddProduct onBack={switchToInventory} />
        ) : (
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
            enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec ultrices.
            Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
            leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
            feugiat vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac.
          </Typography>
        )}
      </Box>
    </Box>
  );
}