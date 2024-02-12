import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  CardContent,
  CardHeader,
  Grid,
  Snackbar,
  Typography
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { getServers } from "../../api/server-service";
import { Link as RouterLink } from "react-router-dom";
import CustomPagination from "../../pagination/pagination";
import Server from "./Server";
import "./ServerList.scss";

function ServerList() {
  const [servers, setServers] = useState([]);
  const [noOfRows, setNoOfRows] = useState(4);
  const [selectedPage, setSelectedPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchServers();
  }, []);
  
  const fetchServers = () => {
    getServers()
      .then((response) => {
        console.log("Server data:", response.data);
        const servers = response.data;
        setServers(servers);

        if (servers && servers.length > 0) {
          showSnackbar("Successfully fetched all Servers.", "success");
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.log(error);
        showSnackbar(error.message, "error");
      });
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={10}>
          <CardHeader
            title="Server List"
            action={
              <Button
                component={RouterLink}
                to="/server-detail"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Add Server
              </Button>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              List of all servers
            </Typography>
            {servers && servers.length === 0 ? (
              <Typography>No Servers Added Yet...</Typography>
            ) : (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ padding: "8px" }}>Sl No.</th>
                      <th style={{ padding: "8px" }}>Name</th>
                      <th style={{ padding: "8px" }}>Host</th>
                      <th style={{ padding: "8px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servers.map((item, index) => (
                      <Server key={item.id} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <CustomPagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              objects={servers}
              noOfRows={noOfRows}
              setNoOfRows={setNoOfRows}
            />
          </CardContent>
        </Paper>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Grid>
  );
}

export default ServerList;
