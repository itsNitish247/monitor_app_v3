import React from 'react';
import ApexCharts from 'apexcharts';
import { getCPUInfo } from '../../api/task-manager-service';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
    this.chart = null;

    this.state = {
      series: [],
      options: {
        chart: {
          id: 'basic-line',
          height: 350,
          type: 'line',
        },
        xaxis: {
          categories: [], // Categories for x-axis (e.g., timestamps)
        },
      },
    };
  }

  componentDidMount() {
    this.chart = new ApexCharts(this.chartRef.current, this.state.options);
    this.chart.render();

    // Fetch CPU data and update the chart
    this.updateDataInterval = setInterval(this.fetchCpuData, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateDataInterval);
  }

  fetchCpuData = () => {
    getCPUInfo()
      .then(response => response.json())
      .then(data => {
        // Extract timestamps and CPU usage values from data
        const timestamps = [];
        const cpuUsageData = [];

        data.forEach(item => {
          if (item && typeof item === 'object' && item.timestamp && item.cpuUsage) {
            timestamps.push(item.timestamp);
            cpuUsageData.push(item.cpuUsage);
          }
        });

        // Update state with new series data and x-axis categories
        this.setState({
          series: [{
            name: 'CPU Usage',
            data: cpuUsageData,
          }],
          options: {
            ...this.state.options,
            xaxis: {
              ...this.state.options.xaxis,
              categories: timestamps,
            },
          },
        });

        // Update the chart with new data
        this.chart.updateSeries(this.state.series);
        this.chart.updateOptions(this.state.options);
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  render() {
    return (
      <div>
        <div ref={this.chartRef}></div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
