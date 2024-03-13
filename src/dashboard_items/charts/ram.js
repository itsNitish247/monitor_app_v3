import { Card, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function RamUsage() {
  const [waveData, setWaveData] = useState([]);

  useEffect(() => {
    generateDummyData();
  }, []);

  const generateDummyData = () => {
    const dummyData = [];
    const currentTime = new Date().getTime();
    for (let i = 0; i < 360; i++) {
      const timestamp = currentTime - i * 100; // Generating timestamps 1 second apart
      const value = Math.sin((i * Math.PI) / 180) * 50 + 50; // Generate a sine wave between 0 and 100
      dummyData.push({ x: timestamp, y: value });
    }
    setWaveData(dummyData);
  };

  const options = {
    chart: {
      type: 'line',
      height: 350,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000 // Adjust speed of animation
        }
      }
    },
    series: [{
      name: 'Wave',
      data: waveData
    }],
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      max: 100,
      min: 0,
      title: {
        text: 'Wave Value'
      }
    },
    stroke: {
      curve: 'smooth'
    }
  };

  return (
<Grid item xs = {12}>
<Card >
      <ReactApexChart options={options} series={options.series} type="line" height={350} />
   
      </Card>   </Grid>
  );
}

export default RamUsage;
