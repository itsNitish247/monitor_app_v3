import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Button, Snackbar, Alert, Skeleton, useTheme } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { listWSRequests } from '../api/ws-request-service';

function WebServiceStatus() {
  const [loading, setLoading] = useState(true);
  const [webServiceData, setWebServiceData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchWebService();
  }, []);
  const theme = useTheme();
  const fetchWebService = () => {
    listWSRequests()
      .then((response) => {
        console.log("Web service data:", response.data);
        setTimeout(() => {
        
          setWebServiceData(response.data);
          setLoading(false);
          if (response.data > 0) {
            showSnackbar("Successfully fetched Web Service Status.", "success");
          }
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        showSnackbar("Error fetching Web Service Status: " + error.message, "error");
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

  const handleRefresh = () => {
    setLoading(true);
    fetchWebService();
  };

  return (
   
      <Grid item xs={12}>
        <Card elevation={3}>
          <CardHeader
            title="Web Service Status"
            action={
              <Button
                variant="contained"
                color="secondary"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            }
          />
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service Name</TableCell>
                  <TableCell>Http Method</TableCell>
                  <TableCell>Active Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                ) : (
                  webServiceData.map((webService) => (
                    <TableRow key={webService.url}>
                      <TableCell>{webService.url}</TableCell>
                      <TableCell>{webService.httpMethod}</TableCell>
                      <TableCell>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: webService.isActive ? theme.palette.success.main : theme.palette.error.main,
                          color: 'white',
                        }}
                        disabled={!webService.isActive}
                      >
                        {webService.isActive ? "Active" : "InActive"}
                      </Button>
                      </TableCell>
                      <TableCell>
                        {/* <Button
                          onClick={() => handleZoomInClickForWebService(webService)}
                          style={{ cursor: 'pointer' }}
                        >
                          Zoom In
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
   
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default WebServiceStatus;
