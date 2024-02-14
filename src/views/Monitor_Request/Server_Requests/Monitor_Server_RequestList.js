import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Snackbar,
  Alert
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { getMonitorRequest } from "../../../api/monitor-service/monitor-request-service";
import CustomTablePagination from "../../../pagination/pagination";

function MonitorServerRequest() {
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [monitorRequests, setMonitorRequests] = useState([]);
  useEffect(() => {
    fetchMonitorRequests();
  }, []);

  const fetchMonitorRequests = () => {
    getMonitorRequest()
      .then((response) => {
        console.log("the requests are" + response.data);
        setTimeout(() => {
        setMonitorRequests(response.data);
        setLoading(false);
        if(response.data.length>0){
        showSnackbar("Successfully fetched all Monitor Requests..");
        }
    },2000);
      })
      .catch((error) => {
        console.log(error);
        showSnackbar("Error fetching ServerRequests: " + error.message, "error");
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

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper elevation={10}>
          <CardHeader
            title="Monitor Server Request"
            action={
              <Button
                component={RouterLink}
                to="/monitor-server-details"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Add Request
              </Button>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              List of all Monitor Server Requests
            </Typography>
            {loading ? ( 
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...Array(rowsPerPage)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              ) : monitorRequests.length === 0 ? (
  <Typography variant="body3" className="text-secondary">
    No Requests Added Yet...
  </Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Request Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Server</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>User Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monitorRequests
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell align="center">{item.id}</TableCell>
                          <TableCell align="center">{item.name}</TableCell>
                          <TableCell align="center">{item.server.host}</TableCell>
                          <TableCell align="center"> {item.users.map((user) => (
          <div key={user.id}>
          {user.name}</div>
        ))}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <CustomTablePagination
              count={monitorRequests.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Paper>
      </Grid>
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

export default MonitorServerRequest;
  