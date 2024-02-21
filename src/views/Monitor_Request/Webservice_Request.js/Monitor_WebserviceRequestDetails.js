import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardHeader,
  Paper,
  CardContent
} from "@mui/material";
import {
  getMonitorRequestWebserviceById,
  addMonitorWebserviceRequest,
  updateMonitorWebserviceRequest,
} from "../../../api/monitor-service/monitor-request-webservice-service";
import { getWebService } from "../../../api/ws-request-service";
import { listUsers } from "../../../api/user-service";
import { useNavigate } from "react-router-dom";

const WebServiceMonitorDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const webId = params.webId || "";
  console.log(webId);

  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [Api, setApi] = useState([]);
  const [selectedApi, setSelectedApi] = useState({});

  const isEditMode = !!webId;


  useEffect(() => {
    if (webId) {
      getMonitorRequestWebserviceById(webId)
        .then((response) => {
          console.log(response.data);

          setName(response.data.name);

          const webservice = response.data.webservice;
          setSelectedApi(webservice);

          const user = response.data.users
            ? response.data.users.length >= 1
              ? response.data.users[0]
              : {}
            : {};

          setSelectedUser(user);

          let sUsers = [];

          if (response.data.users) {
            for (let i = 0; i < response.data.users.length; i++) {
              let u = response.data.users[i];
              sUsers.push(u.id);
            }
          }

          setSelectedUsers(sUsers);
        })
        .catch((error) => {
          console.error("Error fetching webservices:", error);
        });
    }
  }, [webId]);

  // loading webservices
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

    console.log("Selected webservice:", selectedApi);
    console.log("selected users:", selectedUsers);
    let sUsers = [];

    for (let i = 0; i < selectedUsers.length; i++) {
      sUsers.push(users.find((u) => u.id === selectedUsers[i]));
    }

    const requestData = {
      name,
      webservice: selectedApi,
      users: webId ? (sUsers.length > 0 ? sUsers : []) : [],
    };

    if (isEditMode) {
      // Update
      if (webId) {
        requestData.id = webId;
      }
      updateMonitorWebserviceRequest(webId, requestData)
        .then(() => {
          navigate("/monitor-request-list");
        })
        .catch((error) => {
          console.error("Error updating monitor request:", error);
        });
    } else {
      // Adding
      addMonitorWebserviceRequest(requestData)
        .then((response) => {
          const reqData = response.data;
          if (sUsers.length > 0) {
            reqData.users = sUsers;
            updateMonitorWebserviceRequest(webId, reqData)
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

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
    <Grid item xs={12} md={12}>
    <form
      noValidate
      onSubmit={handleSubmit}
    >
     <Paper elevation = {10} style={{ padding: "20px", width: "100%" }}>
      <CardHeader>Server Request </CardHeader>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <TextField
            id="name"
            label="Request Name"
            variant="outlined"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        {/* Server Details Container */}
        <Grid item md={6}>
        <Paper elevation={10}>
        <CardHeader title="Webservice Details" />
            <CardContent>
          <FormControl fullWidth>
            <InputLabel id="webserviceSelectLabel">WebServices</InputLabel>
            <Select
              labelId="webserviceSelectLabel"
              id="webserviceSelect"
              value={selectedApi ? selectedApi.id : ""}
              label="WebServices"
              onChange={(e) =>
                setSelectedApi(
                  Api.find(
                    (webservice) => webservice.id === parseInt(e.target.value)
                  )
                )
              }
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

        {/* User Details Container */}
        <Grid item md={6}>
        <Paper elevation={10}>
            <CardHeader title="User Details" />
            <CardContent>
          <FormControl fullWidth>
            <InputLabel id="userSelectLabel">Users</InputLabel>
            <Select
              labelId="userSelectLabel"
              id="userSelect"
              label='Users'
              multiple
              value={selectedUsers}
              onChange={(e) => {
                setSelectedUser(
                  users.find((user) => user.id === parseInt(e.target.value))
                );
                setSelectedUsers([...selectedUsers, parseInt(e.target.value)]);
              }}
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
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginRight: 10 }}
            >
              Submit
            </Button>
            <Button variant="contained" color="secondary" type="button">
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

export default WebServiceMonitorDetails;
