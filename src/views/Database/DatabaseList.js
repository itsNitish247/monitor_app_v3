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

import { getDatabaseRequest } from "../../api/database-service";
import { Link as RouterLink } from "react-router-dom";

import { Add as AddIcon , Refresh as RefreshIcon } from "@mui/icons-material";
import CustomTablePagination from "../../pagination/pagination";

function DatabaseList() {

  const [databases, setDatabases] = useState([]);

  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
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
        console.log("Database data:", response.data);
        setTimeout(() => {
        setDatabases(response.data);
        setLoading(false);
        if (response.data.length > 0) {
          handleSnackbar("Successfully fetched all Databases", "success");
        }
        },2000);
      })
      .catch((error) => {
        console.error(error);
        handleSnackbar("Error fetching databases:"  + error.message, "error");
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };


  const handleRefresh = () => {
    setLoading(true);
    fetchDatabases  ();
  };
  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper elevation={3}>
         
            <CardHeader
              title="Database List"
              action={
                <>
                     <Button 
                  variant="contained"
                  color="secondary"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                  
                >
                  Refresh
                </Button>
                <Button
                  component={RouterLink}
                  to="/database-detail"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{marginLeft :2}}
                >
                  Add Database
                </Button>
                </>
               
              }
            />
            <CardContent>
              <Typography variant="body2" className="text-secondary">
                List of all Databases
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
              ) : databases.length === 0 ? (
  <Typography variant="body3" className="text-secondary">
    No Databases Added Yet...
  </Typography>
              ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Host & port</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {databases
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item) => (
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
              count={databases.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </CardContent>
       
        </Paper>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
     >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
  
    </Grid>
  );
}

export default DatabaseList;
