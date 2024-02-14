import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  CardContent,
  CardHeader,
  Grid,
  Snackbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add as AddIcon, Bolt } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { getServers } from "../../api/server-service";
import CustomTablePagination from "../../pagination/pagination"; 
// import "../../styles/List.scss";

function ServerList() {
  const [servers, setServers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
        setServers(response.data);
        showSnackbar("Successfully fetched all Servers.", "success");
      })
      .catch((error) => {
        console.log(error);
        showSnackbar("Error fetching servers: " + error.message, "error");
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
            {servers.length === 0 ? (
              <Typography>No Servers Added Yet...</Typography>
            ) : (
              <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
                <Table >
                  <TableHead>
                    <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Host</TableCell>
      </TableRow>
                  </TableHead>
                  <TableBody>
                    {servers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item, index) => (
                        <TableRow key={item.id}>
            <TableCell align="center">{item.id}</TableCell>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.host}</TableCell>
          </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <CustomTablePagination
              count={servers.length}
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
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Grid>
  );
}

export default ServerList;
