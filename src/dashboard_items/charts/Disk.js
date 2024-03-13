import { Card, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function DiskUsage() {
  const [diskUsage, setDiskUsage] = useState([]);

  useEffect(() => {
    generateDummyData();
  }, []);

  const generateDummyData = () => {
    // Dummy disk usage data
    const dummyData = [
      { category: 'used', value: 20 },
      { category: 'free', value: 30 },
      { category: 'Total', value: 100 },
     
    ];
    setDiskUsage(dummyData);
  };

  const options = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: diskUsage.map(data => data.category),
    series: diskUsage.map(data => data.value),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
<Grid item xs ={12}>
<Card>

      <ReactApexChart options={options} series={options.series} type="pie" height={350} />
      </Card> </Grid>
  );
}

export default DiskUsage;
