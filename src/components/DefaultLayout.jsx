import React, { Children } from 'react';
import Sidenav from './Sidenav';
import { Box } from '@mui/material';
import NavBar from './NavBar';
import ActiveLastBreadcrumb from './BreadCrumb';


function DefaultLayout({children}) {
  return (
 <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Sidenav />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <NavBar />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "88px" }}>
          <ActiveLastBreadcrumb /> 
        </Box>
        <Box sx={{ flexGrow: 1, padding: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
     {children}
        </Box>
      </Box>
    </Box>
        </>
  );
}

export default DefaultLayout;
