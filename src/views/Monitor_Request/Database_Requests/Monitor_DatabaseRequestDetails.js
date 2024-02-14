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
import { listUsers } from "../../../api/user-service";
import {
  addMonitorDatabaseRequest,
  getMonitorRequestDatabaseById,
  updateMonitorDatabaseRequest,
} from "../../../api/monitor-service/monitor-request-database-service";
import { useNavigate, useParams } from "react-router-dom";
import { getDatabaseRequest } from "../../../api/database-service";

const DatabaseMonitorDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const requestId = params.requestId;

  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [databases, setDatabases] = useState([]);
  const [users, setUsers] = useState([]);

  const isEditMode = !!requestId;

  useEffect(() => {
    if (requestId) {
      getMonitorRequestDatabaseById(requestId)
        .then((response) => {
          setName(response.data.name);
          setSelectedDatabase(response.data.database);
          setSelectedUsers(response.data.users ? response.data.users.map(u => u.id) : []);
        })
        .catch((error) => {
          console.error("Error fetching databases:", error);
        });
    }
  }, [requestId]);

  useEffect(() => {
    getDatabaseRequest()
      .then((response) => {
        setDatabases(response.data);
      })
      .catch((error) => {
        console.error("Error fetching databases:", error);
      });
  }, []);

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

    let sUsers = [];
    for (let i = 0; i < selectedUsers.length; i++) {
      sUsers.push(users.find((u) => u.id === selectedUsers[i]));
    }

    const requestData = {
      name,
      database: selectedDatabase,
      users: requestId ? (sUsers.length > 0 ? sUsers : []) : [],
    };

    if (isEditMode) {
      if (requestId) {
        requestData.id = requestId;
      }
      updateMonitorDatabaseRequest(requestId, requestData)
        .then(() => {
          navigate("/monitor-request-list");
        })
        .catch((error) => {
          console.error("Error updating monitor request:", error);
        });
    } else {
      addMonitorDatabaseRequest(requestData)
        .then((response) => {
          const reqData = response.data;
          if (sUsers.length > 0) {
            reqData.users = sUsers;
            updateMonitorDatabaseRequest(requestId, reqData)
              .then((res) => {
                console.log(res.data);
              })
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
    setSelectedDatabase("");
    setSelectedUsers([]);
  };

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
    <Grid item xs={12} md={12}>
    <form onSubmit={handleSubmit}>
    <Paper elevation = {10} style={{ padding: "20px", width: "100%" }}>
      <CardHeader>Server Request </CardHeader>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="name"
            label="Request Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
         <Paper elevation={10}>
            <CardHeader title="Database Details" />
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="databaseSelectLabel">Databases</InputLabel>
                <Select
                  labelId="databaseSelectLabel"
                  id="databaseSelect"
                  label="Databases"
                  value={selectedDatabase ? selectedDatabase.id : ""}
                  onChange={(e) =>
                    setSelectedDatabase(
                      databases.find(
                        (database) => database.id === parseInt(e.target.value)
                      )
                    )
                  }
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

export default DatabaseMonitorDetails;
