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
  Alert,
  Card
} from "@mui/material";

import { getServers , getServices } from "../../api/server-service";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import CustomTablePagination from "../../pagination/pagination";
import { Add as AddIcon , Refresh as RefreshIcon } from "@mui/icons-material";



function ServerGroupList() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchServices();
  }, []);


 
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleRefresh = () => {
    setLoading(true);
    fetchServices();
  };

  const fetchServices = () => {
    getServices()
        .then((response) => {
          console.log("Server Group data:", response.data);
          setTimeout(() => {
            setServices(response.data);
            setLoading(false);
            if (response.data.length > 0) {
              showSnackbar("Successfully fetched all Servers Groups.", "success");
            }
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          showSnackbar("Error fetching servers Group: " + error.message, "error");
        });
    };

    const showSnackbar = (message, severity) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
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
            title="Group List"
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
                  to="/server-group-details"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ marginLeft: 2 }}
                >
                  Add Group
                  </Button>
              </>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              List of all Groups
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
              ) : services.length === 0 ? (
  <Typography variant="body3" className="text-secondary">
    No Server Groups Added Yet...
  </Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Group Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Services</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {services
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell align="center">{item.id}</TableCell>
                          <TableCell align="center">  {item.groupName}</TableCell>
                       
                          <TableCell align="center">  {Array.isArray(item.services) ? (
    item.services.map((service, index) => (
      <div key={index}>
        {service.port}
      </div>
    ))
  ) : (
    <div>Invalid ports data</div>
  )}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <CustomTablePagination
              count={services.length}
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
};
export default ServerGroupList;
