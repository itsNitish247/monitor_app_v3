import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { listUsers } from "../../api/user-service";
import {

  addGroups,
  getGroupById,

  updateGroups,
} from "../../api/groups-service";
import { useNavigate, useParams } from "react-router-dom";

import { getDatabaseRequest } from "../../api/database-service";
import { getServers } from "../../api/server-service";

import { getWebService } from "../../api/ws-request-service";



const GroupDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const requestId = params.requestId;

  const [name, setName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState([]);
  const [selectedApi, setSelectedApi] = useState([]);
  const [selectedServer, setSelectedServer] = useState([]);

  const [databases, setDatabases] = useState([]);
  const [users, setUsers] = useState([]);
  const [Api, setApi] = useState([]);
  const [servers, setServers] = useState([]);
  const [selectedPorts , setSelectedPorts] = useState({});

  const isEditMode = !!requestId;

  useEffect(() => {
    if (requestId) {
      getGroupById(requestId)
        .then((response) => {
          setName(response.data.name);
        setSelectedDatabase(response.data.database); // Ensure selectedDatabase is initialized as an array
          setSelectedServer(response.data.servers); // Ensure selectedServer is initialized as an array
          setSelectedApi(response.data.Api);
      // setSelectedPorts(response.data.ports);

          setSelectedUsers(response.data.users ? response.data.users.map(u => u.id) : []);
        })
        .catch((error) => {
          console.error("Error fetching databases:", error);
        });
    }
  }, [requestId]);

  //loading databases
  useEffect(() => {
    getDatabaseRequest()
      .then((response) => {
        setDatabases(response.data);
      })
      .catch((error) => {
        console.error("Error fetching databases:", error);
      });
  }, []);


  //  loading servers
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

//loading webservices
useEffect(() => {
  getWebService()
    .then((response) => {
      console.log("the response is " + response);
      const webservice = response.data;
      setApi(webservice);
    })
    .catch((error) => {
      console.error("Error fetching webservice:", error);
    });
}, []);

//loading ports


  useEffect(() => {
    listUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Create an array to store the selected user objects
    let selectedUsersData = [];
    // Loop through the selected user IDs and find the corresponding user objects
    for (let i = 0; i < selectedUsers.length; i++) {
      const user = users.find((u) => u.id === selectedUsers[i]);
      if (user) {
        selectedUsersData.push(user);
      }
    }
  
    const serverIds = selectedServer.map(server => ({ id: server.id }));
    const databaseIds = selectedDatabase.map(database => ({ id: database.id }));
    const apiIds = selectedApi.map(api => ({ id: api.id }));
    const userIds = selectedUsersData.map(user => ({ id: user.id }));
    
    const requestData = {
      name,
      databases: databaseIds,
      servers: serverIds,  
      webServices: apiIds,
      users: userIds,
    };
    
    console.log("Data sent:", requestData);
  
    if (isEditMode) {
      if (requestId) {
        requestData.id = requestId;
      }
      updateGroups(requestId, requestData)
        .then(() => {
          navigate("/add-groups");
        })
        .catch((error) => {
          console.error("Error updating group:", error);
        });
    } else {
      addGroups(requestData)
        .then(() => {
          // Navigate to group list after successful addition
          navigate("/add-groups");
        })
        .catch((error) => {
          console.error("Error adding group:", error);
        });
    }
  };
  
  const handleClear = () => {
    setName("");
    setSelectedDatabase("");
    setSelectedUsers([]);
  };

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
    <Grid item xs={12} md={12}>
    <form onSubmit={handleSubmit}>
  <Paper elevation = {10} style={{ padding: "20px", width: "100%" }}>
    <CardHeader 
     title="Create a Group"
    />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="name"
            label="Group Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

         {/* Server Details Container */}
         <Grid item xs={4}>

<Paper elevation={10}>
  <CardHeader title="Server/Service" />
  <CardContent>
  <FormControl fullWidth>
  <InputLabel id="serverSelectLabel">Servers</InputLabel>
<Select
  labelId="serverSelectLabel"
  id="serverSelect"
  multiple
  label='Servers'
  value={selectedServer.map(server => server.id)}  
  onChange={(e) => {
            const selectedServerIds = Array.isArray(e.target.value) ? e.target.value.map(value => parseInt(value)) : [];
            setSelectedServer(servers.filter(servers => selectedServerIds.includes(servers.id)));
          }}

>


    <MenuItem value=""><em>Choose the server</em></MenuItem>
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
<Grid item md={4}>
  <Paper elevation={10}>
    <CardHeader title="Webservice" />
    <CardContent>
      <FormControl fullWidth>
        <InputLabel id="webserviceSelectLabel">WebServices</InputLabel>
        <Select
          labelId="webserviceSelectLabel"
          id="webserviceSelect"
          multiple
          value={selectedApi.map(api => api.id)}
          label="WebServices"
          onChange={(e) => {
            const selectedApiIds = Array.isArray(e.target.value) ? e.target.value.map(value => parseInt(value)) : [];
            setSelectedApi(Api.filter(webservice => selectedApiIds.includes(webservice.id)));
          }}
        >
          <MenuItem value="">
            <em>Choose a webservice</em>
          </MenuItem>
          {Api.map((webservice) => (
            <MenuItem key={webservice.id} value={webservice.id}>
              {webservice.url}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CardContent>
  </Paper>
</Grid>

<Grid item xs={4}>
  <Paper elevation={10}>
    <CardHeader title="Database" />
    <CardContent>
      <FormControl fullWidth>
        <InputLabel id="databaseSelectLabel">Databases</InputLabel>
        <Select
          labelId="databaseSelectLabel"
          id="databaseSelect"
          multiple
          label="Databases"
          value={selectedDatabase.map(database => database.id)} 
          onChange={(e) => {
            const selectedDatabaseIds = Array.isArray(e.target.value) ? e.target.value.map(value => parseInt(value)) : [];
            setSelectedDatabase(databases.filter(database => selectedDatabaseIds.includes(database.id)));
          }}
        >
          <MenuItem value=""><em>Choose the database</em></MenuItem>
          {databases.map((database) => (
            <MenuItem key={database.id} value={database.id}>
              {database.name} - {database.host}:{database.port}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CardContent>
  </Paper>
</Grid>

        <Grid item xs={4}>
         <Paper elevation={10}>
            <CardHeader title="User" />
            <CardContent>
            {users.length > 0 && (
  <FormControl fullWidth>
    <InputLabel id="userSelectLabel">Users</InputLabel>
    <Select
      labelId="userSelectLabel"
      id="userSelect"
      multiple
      value={selectedUsers}
      label="Users"
      onChange={(e) => setSelectedUsers(e.target.value)}
    >
      {users.map((user) => (
        <MenuItem key={user.id} value={user.id}>
          {user.name} - {user.email} - {user.type}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)}

            </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: 10 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={handleClear}
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
};

export default GroupDetails;
