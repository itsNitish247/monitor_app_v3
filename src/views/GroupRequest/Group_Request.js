import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, CardHeader, Typography, CardContent, Button, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Add as AddIcon , Refresh as RefreshIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { getMonitorRequest } from '../../api/monitor-service/monitor-request-service';

function GroupRequest() {
  const [groupRequests, setGroupRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shake, setShake] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    // Fetch new data
    fetchGroupRequests();
  };

  const showSnackbar = (message, severity) => {
    // Your snackbar logic
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
        setGroupRequests(response.data); // Assuming response.data contains the group requests
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching group requests:', error);
        setLoading(false);
        // Handle error
      });
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
                <Button
                  component={RouterLink}
                  to="/add-monitor-group"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ marginLeft: 2 }}
                >
                  Monitor Group
                </Button>
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
                        <Button variant='contained' style={{ marginRight: '8px' }}>Start</Button>
                        <Button variant='contained' style={{ marginRight: '8px' }}>Pause</Button>
                        <Button variant='contained' style={{ marginRight: '8px' }}>Resume</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default GroupRequest;
