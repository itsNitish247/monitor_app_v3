import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, CardHeader, Typography, CardContent, Button, Tooltip, Snackbar } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Add as AddIcon , Refresh as RefreshIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { getMonitorRequest, updateMonitorRequest } from '../../api/monitor-service/monitor-request-service';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppStore } from "../../appStore";

function GroupRequest() {
  const [groupRequests, setGroupRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shake, setShake] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [updatingRequest, setUpdatingRequest] = useState(false); // New state variable
  const userType = useAppStore(state => state.userType);
  const handleRefresh = () => {
    setLoading(true);
    fetchGroupRequests();
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500); 
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchGroupRequests();
  }, []);

  const fetchGroupRequests = () => {
    getMonitorRequest()
      .then((response) => {
        setGroupRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching group requests:', error);
        setLoading(false);
      });
  };
  
  const handleAction = (action, requestId) => {
    if (updatingRequest) return; // Prevent multiple requests simultaneously
    setUpdatingRequest(true); // Set updatingRequest to true when request starts
    const updatedRequests = groupRequests.map(request => {
      if (request.id === requestId) {
        return { ...request, status: action.toUpperCase() };
      }
      return request;
    });

    const requestToUpdate = updatedRequests.find(request => request.id === requestId);
    
    updateMonitorRequest(requestToUpdate) 
      .then(() => {
        showSnackbar(`Monitor request ${action}d successfully.`);
        fetchGroupRequests(); 
      })
      .catch((error) => {
        console.error(`Error ${action}ing monitor request:`, error);
        showSnackbar(`Error ${action}ing monitor request.`);
      })
      .finally(() => {
        setUpdatingRequest(false); // Set updatingRequest back to false when request completes
      });
  };

  const handleDelete = (requestId) => {
    setGroupRequests(groupRequests.filter(request => request.id !== requestId));
  };

  return (
    <Grid container spacing={4}> 
      <Grid item xs={12}>
        <Paper elevation={10}>
          <CardHeader
            title="Monitor Group"
            action={
              <>
                <Tooltip
                  title={
                    <div>
                      <p>1. Press Start to begin monitoring</p>
                      <p>2. Press Pause to halt monitoring</p>
                      <p>3. Press Resume to continue monitoring</p>
                    </div>
                  }
                  placement="bottom"
                >
                  <Button>
                    <InfoOutlinedIcon style={{ fontSize: "30px" }} />
                  </Button>
                </Tooltip>
                <Button 
                  variant="contained"
                  color="secondary"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                >
                  Refresh
                </Button>
                {userType !== 'USER' && userType !== 'SUPERWISER' && (
                <Button
                  component={RouterLink}
                  to="/Add-monitor-group"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ marginLeft: 2 }}
                >
                  Monitor Group
                </Button>
                )}
              </>
            }
          />
          <CardContent>
            <Typography variant="body1" color="text.secondary" marginBottom={2}>
              List of Group Requests
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Group Name</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>User</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Monitor Status</TableCell>
                   
                    {userType !== 'USER' && userType !== 'SUPERWISER' && ( <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupRequests.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {request.groups.map((group, index) => (
                          <span key={index}>{group.name}</span>
                        ))}
                      </TableCell>
                      <TableCell align="center">
                        {request.groups.length > 0 &&
                          request.groups[0].users.map((user, userIndex) => (
                            <span key={userIndex}>{user.name}</span>
                          ))}
                      </TableCell>
                      <TableCell align="center">
                        <Button 
                          variant='contained' 
                          style={{ marginRight: '8px' }} 
                          onClick={() => handleAction('start', request.id)} 
                          disabled={updatingRequest} // Disable button while request is in progress
                        >
                          Start
                        </Button>
                        <Button 
                          variant='contained' 
                          style={{ marginRight: '8px' }} 
                          onClick={() => handleAction('pause', request.id)} 
                          disabled={updatingRequest} // Disable button while request is in progress
                        >
                          Pause
                        </Button>
                        <Button 
                          variant='contained' 
                          style={{ marginRight: '8px' }} 
                          onClick={() => handleAction('resume', request.id)} 
                          disabled={updatingRequest} // Disable button while request is in progress
                        >
                          Resume
                        </Button>
                      </TableCell>
                      {userType !== 'USER' && userType !== 'SUPERWISER' && (
                      <TableCell>
                        <DeleteIcon onClick={() => handleDelete(request.id)} />
                      </TableCell>)}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Paper>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </Grid>
  );
}

export default GroupRequest;
