import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { styled } from '@mui/system';

// Create a custom styled component for the chart container
const StyledChartContainer = styled('div')({
  border: '2px solid #fff', 
  borderRadius: 90, 
  padding: 1,
  height : 80
});

const SemiDonutGraphForWebservice = ({ activeWebserviceCount, inactiveWebserviceCount  , totalWebserviceCount}) => {
  const options = {
    chart: {
      type: 'donut',
      height: 100,
    },
  

    
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        expandOnClick: false,
        donut: {
          size: '70%'
        }
      }
    },
    series: [activeWebserviceCount, inactiveWebserviceCount , totalWebserviceCount],
    labels: ['Active ', 'Inactive ' ,"Total"],
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '8px',
 
      markers: {
        width: 12,
        height: 12,
        radius: 6
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function ( opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
      style: {
        fontSize: '10px' 
      }
    },
    tooltip: {
      
      style: {
        fontSize: '7px' 
      
      }
    },
    colors: ['#66de98', '#c94b4b' , "#1e88e5"] 
  };

  return (
    <StyledChartContainer>
      <ReactApexChart options={options} series={options.series} type="donut" height={200} />
    </StyledChartContainer>
  );
};

export default SemiDonutGraphForWebservice;

