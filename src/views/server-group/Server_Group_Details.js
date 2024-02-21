  import React, { useEffect, useState } from 'react';
  import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Typography, Paper, CardHeader, CardContent } from '@mui/material';
  import { useParams } from 'react-router-dom';
  import { getServers, addServices, updateServices } from '../../api/server-service';
  import { useNavigate } from 'react-router-dom';

  const ServerGroupDetail = () => {
    const navigate = useNavigate();
  const params = useParams();
  const serverId = params.serverId;
  const [server, setServer] = useState({});
  const [ports, setPorts] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedPorts, setSelectedPorts] = useState([]);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    loadPorts();
  }, []);
  const loadPorts = async () => {
    try {
      const response = await getServers();
      const serversData = response.data;
  
      if (serversData.length > 0) {
        const selectedServer = serversData[0];
  
        if (selectedServer && selectedServer.ports) {
          setServer(selectedServer);
  
          // Extract required fields (host, serviceName, ports)
          const extractedPorts = selectedServer.ports.map(({ ports, serviceName }) => ({
            host: selectedServer.host,
            serviceName,
            ports,
          }));
  
          setPorts(extractedPorts);
        } else {
          console.error('Selected server or ports are undefined.');
        }
      } else {
        console.error('No servers data available.');
      }
    } catch (error) {
      console.error('Error fetching ports:', error);
    }
  };
  

  useEffect(() => {
    console.log('Ports:', ports);
  }, [ports]);

  useEffect(() => {
    console.log('Selected Ports:', selectedPorts);
  }, [selectedPorts]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const servicesData = selectedPorts.map(({ port, serviceName, host }) => ({
      port: parseInt(port),
      serviceName,
      ip: host, 
    }))
    console.log('Services Data:', servicesData);
    const serverData = {
      groupName,
      services: servicesData,
    };
    console.log('Services Data:', serverData);
  
    if (serverId) {
      // Update
      updateServices(serverId, serverData)
        .then(() => {
          console.log('Services updated successfully:', serverData);
          navigate("/server-list");
        })
        .catch((err) => {
          console.error('Error updating services:', err);
        });
    } else {
      // Create
      addServices(serverData)
        .then(() => {
          console.log('Services added successfully:', serverData);
          navigate("/server-list");
        })
        .catch((err) => {
          console.error('Error adding services:', err);
        });
    }
  };
  
  
  const handleClear = () => {
    setGroupName('');
    setSelectedPorts([]);
  };

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={10}>
            <CardHeader title="ServerGroup Details" />
            <CardContent>
              <form
                noValidate
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="groupName"
                      label="Group Name"
                      variant="outlined"
                      fullWidth
                      required
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      error={validated && !groupName}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <Paper elevation={10}>
                      <CardHeader title="Group Services" />
                      <CardContent>
                      <FormControl fullWidth>
  <InputLabel id="ports-label">Select Ports</InputLabel>
 

     <Select
  labelId="ports-label"
  id="ports"
  multiple
  label="Select Ports"
  value={selectedPorts}
  onChange={(e) => {
    const selectedPortIds = Array.from(e.target.selectedOptions, (option) => ({
      port: parseInt(option.value),
      serviceName: option.textContent.split('-')[0].trim(),
      host: option.textContent.split('(')[1].split(')')[0].trim(),
    }));
    setSelectedPorts(selectedPortIds);
  }}
>
  {ports && ports.length > 0 ? (
    ports.map(({ ports, serviceName, host }) => (
      <MenuItem key={ports} value={ports.toString()}>
        {serviceName} - {ports} ({host})
      </MenuItem>
    ))
  ) : (
    <MenuItem value="">Loading ports...</MenuItem>
  )}
</Select>


</FormControl>


                      </CardContent>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginRight: 10 }}
                      >
                        Submit
                      </Button>
                      <Button variant="contained" color="secondary" type="button" onClick={handleClear}>
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  export default ServerGroupDetail;
