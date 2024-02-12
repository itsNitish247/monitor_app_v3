import React from 'react';
import Sidenav from '../../components/Sidenav';
import NavBar from '../../components/NavBar';
import ServerList from './ServerList';
import Box from '@mui/material/Box';
import ActiveLastBreadcrumb from '../../components/BreadCrumb'; // Import your ActiveLastBreadcrumb component

export default function Servers() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Sidenav />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <NavBar />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "88px" }}>
          <ActiveLastBreadcrumb /> {/* Render your ActiveLastBreadcrumb component */}
        </Box>
        <Box sx={{ flexGrow: 1, padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ServerList />
        </Box>
      </Box>
    </Box>
  );
}
