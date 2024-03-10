import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Grid, Typography } from '@mui/material';

const FlipClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDigit = (digit) => {
    return digit < 10 ? `0${digit}` : `${digit}`;
  };

  const formatHour = (hour) => {
    return hour % 12 || 12;
  };

  const getAmPm = (hour) => {
    return hour >= 12 ? 'PM' : 'AM';
  };

  return (
    <Card elevation={10} sx={{ height: 202 }}>
      <CardHeader title="Web Clock" />
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="h2">
            {formatHour(currentTime.getHours())}:
            {formatDigit(currentTime.getMinutes())}:
            {formatDigit(currentTime.getSeconds())}{' '}
            {getAmPm(currentTime.getHours())}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body3">
            {currentTime.toLocaleDateString()}  
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FlipClock;
