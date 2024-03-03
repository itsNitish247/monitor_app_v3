import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, CardHeader, Typography, CardContent, Button } from '@mui/material';

function Alerts() {
  const [warnLogs, setWarnLogs] = useState([]);

  useEffect(() => {
    axios.get('/api/warn-logs')
      .then(response => {
        setWarnLogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching warn logs:', error);
      });
  }, []); 

  return (
   <Grid container spacing={4}> 
    <Grid item xs={12}>
    <Paper elevation={10}>

    <CardHeader title="Alerts "
    />
  
<CardContent>
 
<Typography variant="body1" color="text.secondary" marginBottom={2}>
              Last 24 hours
            </Typography>
      
            <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold' }} >Alerts Began</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Message</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Severity</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Assign</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Comments</TableCell>
     
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {warnLogs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{log.date}</TableCell>
              <TableCell>{log.message}</TableCell>
              <TableCell>{log.severity}</TableCell>
    
            </TableRow>
          ))} */}
          <TableBody>
      
            <TableRow >
              <TableCell align='center'>24-10-2024</TableCell>
              <TableCell align='center'>this is an warning</TableCell>
              <TableCell align='center'>
      <Button variant='contained'  color='warning' >warning</Button>
    </TableCell>
              <TableCell align='center'>nitish </TableCell>
              <TableCell align='center'>this has been fixed </TableCell>
    
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
    </Paper>
    </Grid>
   </Grid>
  );
}

export default Alerts;
