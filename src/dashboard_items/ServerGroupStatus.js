import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Button, Snackbar, Alert, Skeleton } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { getServices } from "../api/server-service";
import { useTheme } from '@emotion/react';

function ServerGroupStatus() {
  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchServerGroups();
  }, []);

  const theme = useTheme();
  const fetchServerGroups = () => {
    getServices()
      .then((response) => {
        console.log("Server groups data:", response.data);
        setTimeout(() => {
          setServiceData(response.data);
          setLoading(false);
          if (response.data.length > 0) {
            showSnackbar("Successfully fetched all Server Groups.", "success");
          }
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        showSnackbar("Error fetching server groups: " + error.message, "error");
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
    fetchServerGroups();
  };

  const chunks = serviceData.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 20);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; 
    }

    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <Grid item xs={12}>
      <Card elevation={3}>
        <CardHeader
          title="Server Group"
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
          {chunks.map((chunk, rowIndex) => (
            <Grid key={`row-${rowIndex}`} container spacing={3}>
              {chunk.map((servicesGroup, columnIndex) => (
                <Grid key={`col-${rowIndex}-${columnIndex}`} item xs={12} sm={6}>
                  <Card elevation={3}>
                    <CardHeader
                      title={servicesGroup.groupName}
                    />
                    <CardContent>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Services</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell colSpan={2}>
                                <Skeleton />
                              </TableCell>
                            </TableRow>
                          ) : (
                            servicesGroup.services && servicesGroup.services.length > 0 ? (
                              servicesGroup.services.map((service, index) => (
                                <TableRow key={`${servicesGroup.groupName}-${index}`}>
                                  <TableCell>{service.serviceName} - {service.ip} : {service.port}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      style={{
                                        backgroundColor: service.isActive ? theme.palette.success.main : theme.palette.error.main,
                                        color: 'white',
                                      }}
                                      disabled={!service.isActive}
                                    >
                                      {service.isActive ? "Active" : " InActive"}
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={2}>
                                  No services found. Add ports to view server group status.
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ))}
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
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ServerGroupStatus;
