import React, { useEffect, useState } from "react";
import { getServers } from "../../api/server-service";
import { addPorts } from "../../api/ports_service";
import {
  Button,
  CardHeader,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function PortsDetail() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedServer, setSelectedServer] = useState("");
  const [servers, setServers] = useState([]);
  const [ports, setPorts] = useState([{ ports: "", serviceName: "" }]); 

  useEffect(() => {
    getServers()
      .then((response) => {
        console.log(response);
        const servers = response.data;
        setServers(servers);
      })
      .catch((error) => {
        console.error("Error fetching servers:", error);
      });
  }, []);

  const handlePortChange = (index, field, value) => {
    const updatedPorts = [...ports];
    updatedPorts[index][field] = value;
    setPorts(updatedPorts);
  };

  const handleServiceNameChange = (index, value) => {
    handlePortChange(index, "serviceName", value);
  };

  const handleDelete = (index) => {
    const updatedPorts = [...ports];
    updatedPorts.splice(index, 1);
    setPorts(updatedPorts);
  };

  const addPort = () => {
    setPorts([...ports, { ports: "", serviceName: "" }]); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Find the selected server object
    const selectedServerObj = servers.find(server => server.id === selectedServer);

    // Extract the host value from the selected server object
    const host = selectedServerObj ? selectedServerObj.host : '';

    const requestData = {
      name: name,
      host: host,
      ports: ports,
      isActive: true
    };

    console.log("Form submitted:", requestData);

    addPorts(requestData)
      .then(response => {
        console.log("Ports added successfully:", response);
        navigate("/ports-List");
        setName("");
        setSelectedServer("");
        setPorts([{ ports: "", serviceName: "" }]);
      })
      .catch(error => {
        console.error("Error adding ports:", error);
      });
  };

  const handleClear = () => {
    setName('');
    setSelectedServer('');
    setPorts([{ ports: "", serviceName: "" }]);
  };

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={12}>
        <form className="row g-3" onSubmit={handleSubmit}>
          <Paper elevation={10} style={{ padding: "20px", width: "100%" }}>
            <CardHeader>Server Request</CardHeader>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <Paper elevation={2}>
                  <CardHeader title="Server Details" />
                  <CardContent>
                    <FormControl fullWidth>
                      <InputLabel id="serverSelectLabel">Servers</InputLabel>
                      <Select
                        labelId="serverSelectLabel"
                        id="serverSelect"
                        value={selectedServer}
                        onChange={(e) => setSelectedServer(e.target.value)}
                        label="Servers"
                      >
                        <MenuItem value="">
                          <em>Choose the server</em>
                        </MenuItem>
                        {servers.map((server) => (
                          <MenuItem key={server.id} value={server.id}>
                            {server.name} - {server.host}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </CardContent>
                </Paper>
              </Grid>

              <Grid item xs={6}>
                {ports.map((port, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        label="Port"
                        required
                        fullWidth
                        value={port.ports}
                        onChange={(e) => handlePortChange(index, "ports", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="text"
                        label="Service Name"
                        required
                        fullWidth
                        value={port.serviceName}
                        onChange={(e) => handleServiceNameChange(index, e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
                      {index > 0 && (
                        <div
                          style={{ cursor: "pointer", color: "black" }}
                          onClick={() => handleDelete(index)}
                        >
                          <DeleteIcon />
                        </div>
                      )}
                    </Grid>
                  </Grid>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addPort}
                  style={{ marginTop: "10px" }}
                >
                  Add more Services
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleClear}
                    color="secondary"
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
}

export default PortsDetail;
