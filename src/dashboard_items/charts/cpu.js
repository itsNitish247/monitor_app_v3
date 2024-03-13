import { Card, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function App() {
  const [cpuData, setCpuData] = useState([]);

  useEffect(() => {
    // Generate dummy data when component mounts
    generateDummyData();
  }, []);

  const generateDummyData = () => {
    const dummyData = [];
    const currentTime = new Date().getTime();
    for (let i = 0; i < 10; i++) {
      const timestamp = currentTime - i * 60000; // Generating timestamps 60 seconds apart
      const cpuUsage = Math.floor(Math.random() * 101); // Random CPU usage between 0 and 100
      dummyData.push({ x: timestamp, y: cpuUsage });
    }
    setCpuData(dummyData);
  };

  const options = {
    chart: {
      type: 'line',
      height: 350
    },
    series: [{
      name: 'CPU Usage',
      data: cpuData
    }],
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      max: 100,
      title: {
        text: 'CPU Usage (%)'
      }
    }
  };

  return (

   <Grid item xs={12}>
   <Card>
      <ReactApexChart options={options} series={options.series} type="line" height={350} />
      </Card>
</Grid>
  
  );
}

export default App;
