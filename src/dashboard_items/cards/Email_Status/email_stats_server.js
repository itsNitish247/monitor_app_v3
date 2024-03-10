import React, { useEffect, useState } from "react";
import { getMonitorStatus } from "../../../api/monitor-service/monitor-status-service";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';
import Skeleton from '@mui/material/Skeleton';
import CustomTablePagination from '../../../pagination/pagination';

function EmailStatsServer() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    fetchMonitorStatusList();
  }, []);

  const fetchMonitorStatusList = () => {
    getMonitorStatus()
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

  const handleRefresh = () => {

    };

  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={10}>
          <Card>
            <CardHeader
              title="Mail Status"
              action={
                <>
                  <motion.div
                    animate={{ x: shake ? [-5, 5, -5, 5, 0] : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Tooltip title="You can view list of mails sent here" placement="bottom">
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
                </>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                List of all Mails sent
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
                  No Mails Sent Yet...
                </Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Server</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>UserName</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Mail-Sent</TableCell>
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
                            <TableCell align="center"> {item.id}</TableCell>
                            <TableCell align="center">{item.server.host}</TableCell>
                            <TableCell align="center">{item.user.name}</TableCell>
                            <TableCell align="center">mailSentButton</TableCell>
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
          </Card>
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

export default EmailStatsServer;
