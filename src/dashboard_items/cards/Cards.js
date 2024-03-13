import React from 'react';
import { Link } from 'react-router-dom'; 
import { Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import WarningIcon from '@mui/icons-material/Warning';
import GroupIcon from '@mui/icons-material/Group';
import { motion } from 'framer-motion';

function Cards() {
  const cardVariants = {
    hover: {
      scale: 1.1, // Increase size on hover
      transition: {
        duration: 0.2, // Set transition duration
      },
    },
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={2} justifyContent="center"> 
        <Grid item xs={3}>
          <Link to="/Email" style={{ textDecoration: 'none'}}>
            <motion.div whileHover="hover" variants={cardVariants}>
            <Card elevation={5} sx={{ borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' , backgroundColor :"#673ab7" }}>
                <CardContent>
                  <IconButton style={{ color: 'white' }}>
                    <MarkEmailReadIcon sx={{ fontSize: 30 }} /> 
                  </IconButton>
                </CardContent>
                <CardContent sx={{ height: '100%' }}>
                  <Typography variant="h5" align="right" sx={{color :'white'}}>Email Sent</Typography>
                  <Typography variant="h4" align="right" sx={{color :'white'}}>0</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </Grid>

        <Grid item xs={3}>
          <Link to="/Problems" style={{ textDecoration: 'none'}}>
            <motion.div whileHover="hover" variants={cardVariants}>
              <Card elevation={5} sx={{ borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' , backgroundColor :"#f44336" }}>
                <CardContent>
                  <IconButton style={{ color: 'white' }}>
                    <ErrorIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </CardContent>
                <CardContent>
                  <Typography variant="h5" align="right" sx={{color :'white'}}>Problems</Typography>
                  <Typography variant="h4" align="right" sx={{color :'white'}}>0</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </Grid>

        <Grid item xs={3}>
          <Link to="/Alerts" style={{ textDecoration: 'none'}}>
            <motion.div whileHover="hover" variants={cardVariants}>
            <Card elevation={5} sx={{ borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' , backgroundColor :"#FFAD01" }}>
                <CardContent>
                  <IconButton style={{ color: 'white ' }}>
                    <WarningIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </CardContent>
                <CardContent>
                  <Typography variant="h5" align="right" sx={{color :'white'}}>Alerts</Typography>
                  <Typography variant="h4" align="right" sx={{color :'white'}}>0</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </Grid>

        <Grid item xs={3}>
          <Link to="/Users-activity" style={{ textDecoration: 'none'}}>
            <motion.div whileHover="hover" variants={cardVariants}>
            <Card elevation={5} sx={{ borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' , backgroundColor :"#0288d1" }}>
                <CardContent>
                  <IconButton style={{ color: 'white' }}>
                    <GroupIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </CardContent>
                <CardContent>
                  <Typography variant="h5" align="right" sx={{color :'white'}}>Users</Typography>
                  <Typography variant="h4" align="right" sx={{color :'white'}}>0</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cards;
