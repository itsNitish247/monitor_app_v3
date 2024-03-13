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
  Tooltip
} from "@mui/material";
import { Add as AddIcon , Refresh as RefreshIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { getServers } from "../../api/server-service";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CustomTablePagination from "../../pagination/pagination";
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppStore } from "../../appStore";

function ServerList() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [shake, setShake] = useState(false);




  const userType = useAppStore(state => state.userType);

  useEffect(() => {
    fetchServers();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchServers();
  };

  const fetchServers = () => {
    getServers()
      .then((response) => {
        console.log("Server data:", response.data);
        setTimeout(() => {
          setServers(response.data);
          setLoading(false);

          if (response.data.length > 0) {
            showSnackbar("Successfully fetched all Servers.", "success");
          }
        }, 1000);
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

const handleDelete = (id) =>{
  setServers(servers.filter(server => server.id !== id));
}


  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500); 
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper elevation={10}>
        <CardHeader
  title="Server List"
  action={
    <>
<motion.div
      animate={{ x: shake ? [-5, 5, -5, 5, 0] : 0 }}
      transition={{ duration: 0.5 }} 
      style={{ display: 'inline-block' }}
    >
      <Tooltip title="You can view list of servers added here" placement="bottom">
      <Button 
          onMouseEnter={() => setShake(true)}
          onMouseLeave={() => setShake(false)}
          sx={{ '&:hover': { backgroundColor: 'transparent' } }}
        >
          <InfoOutlinedIcon style={{ fontSize: "30px" }} />
        </Button>
      </Tooltip>
    </motion.div>

      <Button 
        variant="contained"
        color="secondary"
        startIcon={<RefreshIcon />}
        onClick={handleRefresh}
  
      >
        Refresh
      </Button>

      {/* <Button
        component={RouterLink}
        to="/server-detail"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ marginLeft: 2 }}
      >
        Add Server
      </Button> */}
      {userType !== 'USER' && userType !== 'SUPERWISER' && (
                  <Button
                    component={RouterLink}
                    to="/Server-detail"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{ marginLeft: 2 }}
                  >
                    Add Server
                  </Button>
                )}
    </>
  }
/>

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              List of all servers
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
            ) : servers.length === 0 ? (
              <Typography variant="body3" className="text-secondary">
                No Servers Added Yet...
              </Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Host</TableCell>
                      {userType !== 'USER' && userType !== 'SUPERWISER' && (
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {servers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item) => (
                        <TableRow 
                          key={item.id} 
                       
                            sx={{
                            '&:hover': {
                              border: '2px solid blue', 
                            
                            }

                          }}
                        >
                          <TableCell align="center">{item.id}</TableCell>
                          <TableCell align="center">{item.name}</TableCell>
                          <TableCell align="center">{item.host}</TableCell>
                          {userType !== 'USER' && userType !== 'SUPERWISER' && (
                            <TableCell align="center">
                              <DeleteIcon onClick={() => handleDelete(item.id)} />
                            </TableCell>
                          )}
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

export default ServerList;
