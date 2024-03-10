import React, { useEffect, useState } from 'react';
import {
  Button,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select
} from '@mui/material';
import { getGroups } from '../../api/groups-service';
import { addMonitorRequest } from '../../api/monitor-service/monitor-request-service';
import { useNavigate } from 'react-router-dom';

function GroupRequestDetail() {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  useEffect(() => {
    fetchGroups();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchGroups();
  };

  const fetchGroups = () => {
    getGroups()
      .then((response) => {
        console.log('Groups data:', response.data);
        setTimeout(() => {
          setGroups(response.data);
          setLoading(false);
          if (response.data.length > 0) {
            showSnackbar('Successfully fetched all Groups.', 'success');
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        showSnackbar('Error fetching groups: ' + error.message, 'error');
      });
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (selectedGroupId) {
      const requestData = {
        groups: [
          { id: selectedGroupId }
        ]
      };
  
      console.log('Request Data:', requestData);
  
      addMonitorRequest(requestData)
        .then(() => {
          showSnackbar('Group added to monitor request.', 'success');
          setSelectedGroupId('');
          navigate("/add-request");
        })
        .catch((error) => {
          console.error('Error adding group to monitor request:', error);
          showSnackbar('Error adding group to monitor request.', 'error');
        });
    } else {
      showSnackbar('Please select a group.', 'error');
    }
  };
  
  
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={12}>
        <form>
          <Paper elevation={10} style={{ padding: '20px', width: '100%' }}>
            <CardHeader title="Add Group" />
            <CardContent>
              <Grid item xs={6}>
                <Paper elevation={10}>
                  <CardHeader title="Groups" />
                  <CardContent>
                    <FormControl fullWidth>
                      <InputLabel id="groupSelectLabel">Groups</InputLabel>
                      <Select
  labelId="groupSelectLabel"
  id="groupSelect"
  value={selectedGroupId}
  onChange={(e) => setSelectedGroupId(e.target.value)}
  label="Groups"
>
  <MenuItem value="">
    <em>Select a group</em>
  </MenuItem>
  {groups.map((group) => (
    <MenuItem key={group.id} value={group.id}>
      {group.name}
    </MenuItem>
  ))}
</Select>

                    </FormControl>
                  </CardContent>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Button type="button" variant="contained" color="secondary">
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
}

export default GroupRequestDetail;
