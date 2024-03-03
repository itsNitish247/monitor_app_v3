import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, CardHeader, Typography, CardContent, Button } from '@mui/material';
import React from 'react'

function Problems() {
  return (
    <Grid container spacing={4}> 
    <Grid item xs={12}>
    <Paper elevation={10}>

    <CardHeader title="Problems "
    />
  
<CardContent>
 
<Typography variant="body1" color="text.secondary" marginBottom={2}>
              Last 24 hours
            </Typography>
      
            <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold' }} >Issues Began</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Issue Name</TableCell>
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
      <Button variant='contained'  color='error' >CRITICAL</Button>
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

export default Problems
