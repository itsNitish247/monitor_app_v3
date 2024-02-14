import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDatabaseRequest } from "../../api/database-service";
import { Link as RouterLink } from "react-router-dom";
import Database from "./Database";
// import CustomPagination from "../../pagination/pagination";
import { Add as AddIcon } from "@mui/icons-material";

function DatabaseList() {
  const [databases, setDatabases] = useState([]);
  const navigate = useNavigate();
  const [noOfRows, setNoOfRows] = useState(4);
  const [selectedPage, setSelectedPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchDatabases();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchDatabases = () => {
    getDatabaseRequest()
      .then((response) => {
        console.log(response);
        const databases = response.data;
        setDatabases(databases);
        if (databases && databases.length > 0) {
          handleSnackbar("Successfully fetched all Databases", "success");
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.error(error);
        handleSnackbar(error.message, "error");
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Card>
            <CardHeader
              title="Database List"
              action={
                <Button
                  component={RouterLink}
                  to="/database-detail"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  Add Database
                </Button>
              }
            />
            <CardContent>
              <Typography variant="body2" className="text-secondary">
                List of all Databases
              </Typography>
              {databases && databases.length === 0 ? (
                <Typography>No Databases Added Yet..</Typography>
              ) : (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ padding: "8px" }}>Sl No.</th>
                        <th style={{ padding: "8px" }}>Name</th>
                        <th style={{ padding: "8px" }}>Host & port</th>
                        <th style={{ padding: "8px" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {databases.map((item, index) => (
                        <Database key={item.id} item={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* <CustomPagination
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                objects={databases}
                noOfRows={noOfRows}
                setNoOfRows={setNoOfRows}
              /> */}
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Grid>
  );
}

export default DatabaseList;
