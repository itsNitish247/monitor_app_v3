import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import  FlipClock from '../Dashboard_Clock/Clock';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function Items({serverCount}) {
  return (
   <>
      <Grid item xs={8}>
        <Card elevation={10}>
          <CardHeader title="Total Services Monitored" />
          <CardContent>
            <Grid container spacing={2} >
              <Grid item xs={4}>
                <Paper elevation={10}>
                  <Card sx={{ minWidth: 90 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                        Servers
                      </Typography>
                      <Typography variant="h5" >
                   
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View Servers</Button>
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={10}>
                  <Card sx={{ minWidth: 100 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                        Databases
                      </Typography>
                      <Typography variant="h5" >
                        7
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View Databases</Button>
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={10}>
                  <Card sx={{ minWidth: 100 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                        Webservices
                      </Typography>
                      <Typography variant="h5" >
                        7
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View Api's</Button>
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <FlipClock />
      </Grid>
</>
  )
}

export default Items;
