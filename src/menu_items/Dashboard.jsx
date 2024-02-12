import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


export default function Dashboard() {
  return (
    <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 2,
        p: 1,  
        width: 250,
        height: 150,
      },
    }}
  >
    <Paper elevation={5} />
    <Paper elevation={5} />
    <Paper elevation={5} />
    <Paper elevation={5} />
  </Box>
  );
}
