import React from 'react';
import Sidenav from './Sidenav';
import {  Grid } from '@mui/material';
import NavBar from './NavBar';


function DefaultLayout() {
  return (
 <>
    
        <Grid>
          <NavBar />
        </Grid>
    
    
  
        <Grid>
          <Sidenav/>
        </Grid>
        </>
  );
}

export default DefaultLayout;
