
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
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
import { useParams } from "react-router-dom";
import {
  getMonitorRequestById,
  addMonitorRequest,
  updateMonitorRequest,
} from "../../../api/monitor-service/monitor-request-service";
import { getServers } from "../../../api/server-service";
import { listUsers } from "../../../api/user-service";
import { useNavigate } from "react-router-dom";


const ServerMonitorDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const requestId = params.requestId;
    console.log(requestId);

    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [hostName, setHostName] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [port, setPort] = useState("");
    const [servers, setServers] = useState([]);
    const [selectedServer, setSelectedServer] = useState({});
    const [databases,setdatabases]=useState([]);
    const [selectedDatabase , setSelectedDatabase]=useState({});

    const isEditMode = !!requestId;
// UseEffect for loading Selected Monitoring Request for Editing
useEffect(() => {
  if (requestId) {
    getMonitorRequestById(requestId)
      .then((response) => {
        console.log(response.data);

        setName(response.data.name);

        const server = response.data.server;
        setSelectedServer(server);

        const user = response.data.users
          ? response.data.users.length >= 1
            ? response.data.users[0]
            : {}
          : {};

        setSelectedUser(user);

        let sUsers = [];

        if(response.data.users){
          for(let i = 0; i < response.data.users.length ; i++)
          {
            let u = response.data.users[i];
            sUsers.push(u.id)
          }
        }

        setSelectedUsers(sUsers);
      })
      .catch((error) => {
        console.error("Error fetching servers:", error);
      });
  }
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




// loading users
useEffect(() => {
  listUsers()
    .then((response) => {
      console.log(response);
      const users = response.data;
      setUsers(users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}, []);

const handleSubmit = (event) => {
  event.preventDefault();

console.log("selected servers:",selectedServer)
console.log("selected users:",selectedUsers)
  let sUsers = [];


  for(let i = 0; i < selectedUsers.length; i++){
    sUsers.push(users.find((u)=> u.id === selectedUsers[i]))
  }

  const requestData = {
    name,
    server: selectedServer,
    users: requestId ? (sUsers.length > 0 ? sUsers : []) : [],
  };

  if (isEditMode) {
    // Update
    if (requestId) {
      requestData.id = requestId;
    }
    updateMonitorRequest(requestId, requestData)
      .then(() => {
        navigate("/monitor-request-list");
      })
      .catch((error) => {
        console.error("Error updating monitor request:", error);
      });
  } else {


    // Adding
    addMonitorRequest(requestData)
      .then((response) => {
        const reqData = response.data;
        if (sUsers.length > 0) {
          reqData.users = sUsers;
          updateMonitorRequest(requestId, reqData)
            .then((res) => { console.log(res.data)})
            .catch((error) => {
              console.error("Error updating monitor request:", error);
            });
        }
        navigate("/monitor-request-list");
      })
      .catch((error) => {
        console.error("Error adding monitor request:", error);
      });
  }
};

const handleClear = () => {
  setName("");
  setSelectedServer("");
  setSelectedUsers([]);
};

return  (
  <Grid container spacing={1} justifyContent="center" alignItems="center">
  <Grid item xs={12} md={12}>
    <form className="row g-3" onSubmit={handleSubmit}>
      <Paper elevation={10} style={{ padding: "20px", width: "100%" }}>
      <CardHeader>Server Request </CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              label="Request Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          
          {/* Server Details Container */}
          <Grid item xs={6}>

            <Paper elevation={10}>
              <CardHeader title="Server Details" />
              <CardContent>
                <FormControl fullWidth>
                  <InputLabel id="serverSelectLabel">Servers</InputLabel>
                  <Select
                    labelId="serverSelectLabel"
                    id="serverSelect"
                    value={selectedServer}
                    onChange={(e) => setSelectedServer(e.target.value)}
                    label='Servers'
                  >
                    <MenuItem value="">Choose the server</MenuItem>
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

          {/* User Details Container */}
          <Grid item xs={6}>
        <Paper elevation={10}>
              <CardHeader title="User Details" />
              <CardContent>
                <FormControl fullWidth>
                  <InputLabel id="userSelectLabel">Users</InputLabel>
                  <Select
                    labelId="userSelectLabel"
                    id="userSelect"
                    multiple
                    value={selectedUsers}
                    onChange={(e) => setSelectedUsers(e.target.value)}
                    label='Users'
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name} - {user.email} - {user.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
              >
                Submit
              </Button>
              <Button type="button" variant="contained" onClick={handleClear} color="secondary">
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

  

export default ServerMonitorDetails;