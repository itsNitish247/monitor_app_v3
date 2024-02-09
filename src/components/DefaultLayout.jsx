import React from 'react'
import Sidenav from './Sidenav'
import { Box, Container, Grid } from '@mui/material' // Assuming you're using Material-UI
import NavBar from './NavBar'
import Toolbar from '@mui/material/Toolbar';
import BreadCrumbs from './BreadCrumb'
import CustomBreadcrumbs from './BreadCrumb';

function DefaultLayout() {
  return (
    <Container>
      <Grid container>
        {/* Navbar */}
        <Grid item xs={12}>
          <NavBar />
        </Grid>

      

        {/* Sidebar */}
        <Grid item md={3}>
          <Sidenav />
        </Grid>

    
          
          {/* Other content goes here */}
          {/* For example: <YourMainContentComponent /> */}
        </Grid>
     
    </Container>
  );
}

export default DefaultLayout;