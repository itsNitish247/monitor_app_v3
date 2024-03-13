import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Grid, Typography, Switch, Paper } from '@mui/material';

const FlipClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [is24HourFormat, setIs24HourFormat] = useState(true);

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
    if (is24HourFormat) {
      return hour;
    } else {
      return hour % 12 || 12;
    }
  };

  const getAmPm = (hour) => {
    return hour >= 12 ? 'PM' : 'AM';
  };

  const handleToggleFormat = () => {
    setIs24HourFormat((prevFormat) => !prevFormat);
  };

  return (
    <Card sx={{ height: 156}}>
      
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
     
        <Grid item mt={2}>
          <Typography variant="h2">
            {formatHour(currentTime.getHours())}:
            {formatDigit(currentTime.getMinutes())}:
            {formatDigit(currentTime.getSeconds())}{' '}
            {!is24HourFormat && getAmPm(currentTime.getHours())}
          </Typography>
          </Grid>
      
          <Typography variant="h5">
            {currentTime.toLocaleDateString()}  
          </Typography>
        
        <Grid item>
          <Switch checked={is24HourFormat} onChange={handleToggleFormat} color="primary" />use 24 hr format
        </Grid>
      </Grid>
    </Card>
  );
};

export default FlipClock;
