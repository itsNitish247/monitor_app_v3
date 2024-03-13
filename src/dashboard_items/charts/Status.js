import { Card, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function Status() {
  const [uptimeData, setUptimeData] = useState([]);
  const [downtimeData, setDowntimeData] = useState([]);

  useEffect(() => {
    generateDummyData();
  }, []);

  const generateDummyData = () => {
    // Dummy data for uptime and downtime
    const dummyUptimeData = [
      { category: 'January', value: 0 }, // 720 hours
      { category: 'February', value: 0 }, // 672 hours
      { category: 'March', value: 4 }, // 744 hours
      // Add more data for other months as needed
    ];
    const dummyDowntimeData = [
      { category: 'January', value: 0 }, // 48 hours
      { category: 'February', value: 0 }, // 96 hours
      { category: 'March', value: 0 }, // 24 hours
      // Add more data for other months as needed
    ];
    setUptimeData(dummyUptimeData);
    setDowntimeData(dummyDowntimeData);
  };

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: uptimeData.map(data => data.category),
    },
    legend: {
      position: 'top',
    },
    fill: {
      opacity: 1,
    },
    colors: ['#2ecc71', '#e74c3c'], // Green for uptime, Red for downtime
  };

  return (
  <Grid item xs={12}>
  <Card>
      <ReactApexChart options={options} series={[{ name: 'Uptime', data: uptimeData.map(data => data.value) }, { name: 'Downtime', data: downtimeData.map(data => data.value) }]} type="bar" height={350} />
      </Card></Grid>
  );
}

export default Status;
