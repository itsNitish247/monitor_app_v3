import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function DashboardContent() {
  return (
    <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 5,
        width: 290,
        height: 150,
      },
    }}
  >
    <Paper elevation={5} />
    <Paper elevation={5} />
    <Paper elevation={5} />
  </Box>




  );
}

export default DashboardContent;
