import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Grid,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Pagination from "../../pagination/pagination";
import WebService from "./WebService";
import { listWSRequests } from "../../api/ws-request-service";
import { Add as AddIcon } from "@mui/icons-material";



const WebServiceList = () => {

  const [webServiceRequests, setWebServiceRequests] = useState([]);
  const [noOfRows, setNoOfRows] = useState(4);
  const [selectedPage, setSelectedPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");

  useEffect(() => {
    getWebServiceRequests();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const getWebServiceRequests = () => {
    listWSRequests()
      .then((response) => {
        console.log(response);
        const webServiceRequests = response.data;
        setWebServiceRequests(webServiceRequests);
        if (webServiceRequests && webServiceRequests.length > 0) {
          showSnackbar("Successfully fetched all Web Services..", "success");
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.log(error);
        showSnackbar(error.message, "error");
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper elevation={10}>
          <CardHeader
            title="Web Service List"
            action={
              <Button
                component={RouterLink}
                to="/webservice-detail"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Add Api
              </Button>
            }
          />
       
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              List of all web services available.
            </Typography>
            {webServiceRequests && webServiceRequests.length === 0 ? (
              <Typography >
                No Api Added Yet...
              </Typography>
            ) : (
              <div className="table-container"> 
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ padding: "8px" }}>Sl No.</th>
                      <th style={{ padding: "8px" }}>Name</th>
                      <th style={{ padding: "8px" }}>Url</th>
                      <th style={{ padding: "8px" }}>Http Method</th>
                      <th style={{ padding: "8px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {webServiceRequests.map((item, index) => {
                      let webServiceList;

                      if (
                        index >= (selectedPage - 1) * noOfRows &&
                        index < selectedPage * noOfRows
                      ) {
                        webServiceList = <WebService key={item.id} item={item} index={index} />;
                      }

                      return webServiceList;
                    })}
                    </tbody>
                </table>
              </div>
            )}
            <Pagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              objects={webServiceRequests}
              noOfRows={noOfRows}
              setNoOfRows={setNoOfRows}
            />
          </CardContent>
          </Paper>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        color={snackbarType === "success" ? "success" : "error"}
      />
    </Grid>
  );
};

export default WebServiceList;
