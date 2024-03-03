import React, { useState, useEffect } from 'react';
import { Avatar, CardHeader, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, IconButton } from '@mui/material';
import { Person as PersonIcon, Search as SearchIcon } from '@mui/icons-material';
import { getAllUserLogs } from '../../api/users-log-service';

const UserCard = () => {
  const [userLogs, setUserLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUserLogs();
        setUserLogs(response.data);
      } catch (error) {
        console.error('Error fetching user logs:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUserLogs = userLogs.filter((log) =>
    log.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper elevation={10}>
          <CardHeader title="User Activity" />
          <Typography variant='body-1' marginLeft={2} >
            Last 24 hours
          </Typography>

          <Grid style={{ display: 'flex', alignItems: 'center' ,marginBottom: '1rem', marginLeft :"20px"}}>
            <TextField
              label="Search User"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Grid>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <PersonIcon />
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>User</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Login</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Logout</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUserLogs.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">
                      <Avatar alt="User Avatar" align='center'>
                        {item.user.name.charAt(0)}
                      </Avatar>
                    </TableCell>
                    <TableCell align='center' >
                      <Grid>{item.user.name}</Grid>
                      <Grid >
                        <Grid>{item.user.type} |  Registered: {item.user.email}</Grid> 
                      </Grid>
                    </TableCell>
                    <TableCell align='center'>{new Date(item.loginTime).toLocaleString()}</TableCell>
                    <TableCell align='center'>{item.logoutTime ? new Date(item.logoutTime).toLocaleString() : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserCard;
