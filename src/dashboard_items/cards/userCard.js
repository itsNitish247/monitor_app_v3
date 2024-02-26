import React, { useState, useEffect } from 'react';
import { Avatar, Grid ,Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { getAllUserLogs } from '../../api/users-log-service';

const UserCard = () => {
  const [userLogs, setUserLogs] = useState([]);

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

  return (
<Grid container spacing={2}>
    <Grid item xs={12}>
     <Paper elevation={10}>
    <TableContainer>
        <Table align="middle" className="mb-0 border" hover>
          <TableHead>
            <TableRow>
              <TableCell className="text-center">
                <PersonIcon />
              </TableCell>
              <TableCell>User</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Logout</TableCell>
              <TableCell>Last Login</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userLogs.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  <Avatar alt="User Avatar">
                    {item.user.name.charAt(0)} {/* Displaying the first character of the user's name */}
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div>{item.user.name}</div>
                  <div className="small text-medium-emphasis">
                    <span>{item.user.type}</span> | Registered: {item.user.email}
                  </div>
                </TableCell>
                <TableCell>{new Date(item.loginTime).toLocaleString()}</TableCell>
                <TableCell>{item.logoutTime ? new Date(item.logoutTime).toLocaleString() : '-'}</TableCell>
                <TableCell>{new Date(item.lastLogin).toLocaleString()}</TableCell>
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
