  import React, { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import { TextField, Button, Grid, Typography, Snackbar, Paper, Divider } from '@mui/material';
  import MuiAlert from '@mui/material/Alert';
  import { useNavigate } from 'react-router-dom';
  import { getServerById, addServers, updateServers } from '../../api/server-service';
  import DeleteIcon from '@mui/icons-material/Delete';

  const ServerDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const serverId = params.serverId;
    const [serviceName, setServiceName] = useState('');
    const [server, setServer] = useState({});
    const [groupName, setGroupName] = useState('');
    const [name, setName] = useState('');
    const [host, setHost] = useState('');
    const [ports, setPorts] = useState([{ ports: '', serviceName: '' }]);
    const [isValidHost, setIsValidHost] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessages, setErrorMessages] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const [state, setState] = useState({
      open: false,
      vertical: 'top',
      horizontal: 'right',
    });

    const { vertical, horizontal } = state;

    useEffect(() => {
      getServers();
    }, []);

    const getServers = () => {
      if (serverId) {
        getServerById(serverId)
          .then((response) => {
            const serverData = response.data;
            setServer(serverData);
            setName(serverData.name);
            setHost(serverData.host);
          })
          .catch(error => {
            console.log(error);
          }); 
      }
    };

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    
      const serverData = {
        name,
        host,
        ports,
      };
    
      addServers(serverData) 
    .then(() => {
      setSuccessMessage('Server added successfully');
      handleSnackbar('Server added successfully', 'success');
      navigate("/server-list-server-group-list");
    })
    .catch((error) => {
      console.log(error.response);
      setErrorMessage('Failed to add server');
      handleSnackbar('Failed to add server', 'error');
    });
};
    const handleDelete = (index) => {
      const updatedPorts = [...ports];
      updatedPorts.splice(index, 1);
      setPorts(updatedPorts);  
      setSuccessMessage('Service deleted successfully');
      handleSnackbar('Service deleted successfully', 'success');
    };

    const handleSnackbar = (message, severity) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setOpenSnackbar(true);
    };

    const addPort = () => {
      setPorts([...ports, { ports: '', serviceName: '' }]);
    };

    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnackbar(false);
    };

    const handlePortChange = (index, key, value) => {
      if (parseInt(value) <= 63356) { 
        const updatedPorts = [...ports];
        updatedPorts[index] = { ...updatedPorts[index], [key]: value };
        setPorts(updatedPorts);
      } else {
        const updatedPorts = [...ports];
        updatedPorts[index] = { ...updatedPorts[index], [key]: '' }; 
        setPorts(updatedPorts);
        setErrorMessage('Port value is too long.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      }
    };
    
    const handleHostChange = (value) => {
      setHost(value);
    };

    const handleServiceNameChange = (index, value) => {
      const updatedPorts = [...ports];
      updatedPorts[index] = { ...updatedPorts[index], serviceName: value };
      setPorts(updatedPorts);
    };

    const handleClear = () => {
      setName('');    
      setHost('');
      setPorts([{ ports: '', serviceName: '' }]);
    };
    
    return (
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={12}>
          <Paper elevation={10} style={{ padding: '20px', width: '100%' }}>
            <form noValidate onSubmit={handleSubmit}>
              <Typography variant="h5">Server Details</Typography>
              <Grid container spacing={2} marginTop={1}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    id="serverName"
                    label="Server Name"
                    required
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="serverHost"
                    label="Server Host"
                    required
                    fullWidth
                    value={host}
                    onChange={(e) => handleHostChange(e.target.value)}
                  />
                </Grid>
              </Grid>
    
              {/* Services */}
              <Grid container spacing={2} marginTop={1}>
                <Grid item xs={12}>
                {ports.map((port, index) => (
                  <Grid item xs={6} key={index}>
                    <div className="d-flex mb-3">
                      <div className="me-3">
                        <TextField
                          type="number"
                          label="Port"
                          required
                          fullWidth
                          value={port.ports}
                          onChange={(e) => handlePortChange(index, 'ports', e.target.value)}
                        />
                      </div>
                      <div>
                        <TextField
                          type="text"
                          label="Service Name"
                          required
                          fullWidth
                          value={port.serviceName}
                          onChange={(e) => handleServiceNameChange(index, e.target.value)}
                        />
                      </div>
                      {index > 0 && (
                        <div className="ms-3" style={{ cursor: 'pointer', color: 'black' }} onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </div>
                      )}
                    </div>
                  </Grid>
                


                ))}
                </Grid>
              </Grid>
              
              <Button variant="contained" color="primary" onClick={addPort}>Add more Services</Button>
    
          
              <Grid container justifyContent="flex-end" spacing={2} marginTop={1}>
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">Submit</Button>
                </Grid>
              </Grid>
    
              {/* Snackbar */}
              <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
                  {snackbarMessage}
                </MuiAlert>
              </Snackbar>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
                      };

    export default ServerDetails;
