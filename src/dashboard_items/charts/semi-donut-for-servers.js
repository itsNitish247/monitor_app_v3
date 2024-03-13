import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

const StyledChartContainer = styled('div')({
  border: '2px solid #fff',
  borderRadius: 90, 
  padding:1,
  height : 80
});

const SemiDonutGraphForServers = ({ activeCount, inactiveCount , totalCount}) => {
  const options = {
    chart: {
      type: 'donut',
      height: 100,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        expandOnClick: true,
        donut: {
          size: '70%'
        }
      }
    },
    series: [activeCount, inactiveCount , totalCount] ,
    labels: ['Active', 'Inactive' , 'Total'],
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
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
      style: {
        fontSize: '0px' 
      }
    },
    tooltip: {
      
      style: {
        fontSize: '9px' 
      
      }
    },
    colors: ['#66de98', '#c94b4b' ,"#673ab7"] 
  };


   
      return (
        <StyledChartContainer>
          <ReactApexChart options={options} series={options.series} type="donut" height={200} />
       
        </StyledChartContainer>
   
      
    );
    

};

export default SemiDonutGraphForServers;
