import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { styled } from '@mui/system';



const StyledChartContainer = styled('div')({
  border: '2px solid #fff', 
  borderRadius: 90, 
  padding: 1, 
  height : 80

});

const SemiDonutGraphForDatabase = ({ activeDatabaseCount, inactiveDatabaseCount , totalDatabaseCount}) => {
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
    series: [activeDatabaseCount, inactiveDatabaseCount , totalDatabaseCount],
    labels: ['Active', 'Inactive' ,"Total"],
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
        fontSize: '10px' 
      }
    },
    tooltip: {
      
      style: {
        fontSize: '7px' 
      
      }
    },
    colors: ['#66de98', '#c94b4b' ,"#ffad01"] 
  };

  return (
    <StyledChartContainer>
 
      <ReactApexChart options={options} series={options.series} type="donut" height={200} />
   
      </StyledChartContainer>
  );
};

export default SemiDonutGraphForDatabase;

