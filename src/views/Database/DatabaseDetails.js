import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';  
import { useParams } from 'react-router-dom';
import { getDatabaseRequestById, addDatabaseRequest, updateDatabaseRequest } from '../../api/database-service';
import { useNavigate } from 'react-router-dom';

const DatabaseDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dbId = params.dbId; 

  const [database, setDatabase] = useState({});
  const [name, setName] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [instance, setInstance] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [userName, setUserName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = () => {
    if (dbId) {
      getDatabaseRequestById(dbId) 
        .then((response) => {
          const databaseData = response.data;
          setDatabase(databaseData);
          setName(databaseData.name);
          setHost(databaseData.host);
          setPort(databaseData.port);
          setInstance(databaseData.instance);
          setPassword(databaseData.password);
          setType(databaseData.type);
          setUrl(databaseData.url);
          setUserName(databaseData.userName);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const databaseData = {
      id: dbId,
      name,
      host,
      port,
      instance,
      password,
      type,
      url,
      userName,
    };

    if (dbId) {
      // Update
      updateDatabaseRequest(dbId, databaseData) 
        .then(() => {
          navigate("/databases-list"); 
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Create
      addDatabaseRequest(databaseData) 
        .then(() => {
          navigate("/databases-list"); 
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleClear = () => {
    setName('');
    setHost('');
    setPort('');
    setInstance('');
    setPassword('');
    setType('');
    setUrl('');
    setUserName('');
    setShowPassword(false);
  };
  return (
 
     <Paper elevation={10}>
      <CardHeader title="Database Details" />
     
      <CardContent>
   
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Port"
                type="number"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Instance"
                value={instance}
                onChange={(e) => setInstance(e.target.value)}
                required
              />
            </Grid>
          
            <Grid item xs={6}>
              <FormControl fullWidth >
              <InputLabel id="type">Type</InputLabel>
                <Select
                 labelId="type"
                  id="Type"
                  value={type}
                  label="Type"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value="mysql">MySQL</MenuItem>
                  <MenuItem value="postgre">PostgreSQL</MenuItem>
                  <MenuItem value="mssql">MS SQL Server</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="URL"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="User Name"
                value={userName}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

          
            <Grid container justifyContent="flex-end" spacing={2} marginTop={'10px'}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleClear}>
                Clear
              </Button>
            </Grid>
           
          </Grid>
          </Grid>
        </form>
      </CardContent>
     </Paper>
  
  );
};

export default DatabaseDetail;
