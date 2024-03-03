import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import WarningIcon from '@mui/icons-material/Warning';
import GroupIcon from '@mui/icons-material/Group';

function Cards() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={2} justifyContent="center"> 
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card elevation={5} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <CardContent>
              <Link to="/email">
                <IconButton>
                  <MarkEmailReadIcon sx={{ fontSize: 60 }} />
                </IconButton>
              </Link>
            </CardContent>
            <CardContent>
              <Typography variant="h5" align="right">Email Sent</Typography>
              <Typography variant="h4" align="right">123</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card elevation={5} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <CardContent>
              <Link to="/problems">
                <IconButton>
                  <ErrorIcon sx={{ fontSize: 60 }} />
                </IconButton>
              </Link>
            </CardContent>
            <CardContent>
              <Typography variant="h5" align="right">Problems</Typography>
              <Typography variant="h4" align="right">0</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
        <Link to="/alerts" style={{ textDecoration: 'none'}}>
          <Card elevation={5} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <CardContent>
            
          
                <IconButton>
                  <WarningIcon sx={{ fontSize: 60 }} />
                </IconButton>
            
            </CardContent>
         
            <CardContent>
              <Typography variant="h5" align="right">Alerts</Typography>
              <Typography variant="h4" align="right">0</Typography>
            </CardContent>
        
          </Card>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>

        <Link to="/users-activity" style={{ textDecoration: 'none'}}>
          <Card elevation={5} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <CardContent>
           
                <IconButton>
                  <GroupIcon sx={{ fontSize: 60 }} />
                </IconButton>
           
            </CardContent>
            <CardContent>
              <Typography variant="h5" align="right">Users</Typography>
              <Typography variant="h4" align="right">0</Typography>
            </CardContent>
          </Card>
          </Link>
        </Grid>
     
      </Grid>
    </Box>
  )
}

export default Cards;
