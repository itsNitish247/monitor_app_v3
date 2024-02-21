import React from 'react';
import { 
Grid, 
IconButton, 
Typography } from '@mui/material';
import Cards from './cards/Cards';
import ServerStatus from './ServerStatus';
import ServerGroupStatus from './ServerGroupStatus';
import DatabaseStatus from './DatabaseStatus';
import WebServiceStatus from './WebserviceStatus';


export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
       <Cards />
      </Grid>
      <Grid item xs={12} style={{ marginBottom: '16px' }}>
     </Grid>
      <ServerStatus />
      <Grid item xs={12} style={{ marginBottom: '16px' }}>
     </Grid>
     <ServerGroupStatus />
     <Grid item xs={12} style={{ marginBottom: '16px' }}>
     </Grid>
     <DatabaseStatus />
     <Grid item xs={12} style={{ marginBottom: '16px' }}>
     </Grid>
     <WebServiceStatus />
    </Grid>
  );
}