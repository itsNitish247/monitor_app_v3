  import React, { useEffect, useState } from 'react';
  import { Button, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
  import { useParams } from 'react-router-dom';
  import { getUserById, createUser, updateUser } from '../../api/user-service';
  import { useNavigate } from 'react-router-dom';
  import { useCookies } from 'react-cookie';

  const UserDetail = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['User']);
    const params = useParams();
    const userId = params.userId;

    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
      getUser();
    }, []);

    const getUser = () => {
      if (userId) {
        getUserById(userId)
          .then((response) => {
            console.log(response);
            const user = response.data;
            setUser(user);
            setName(user.name);
            setType(user.type);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
            if (user.id) {
              console.log(user);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setType('');
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      if (password !== confirmPassword) {
        setPasswordInvalid(true);
        return;
      }

      setValidated(true);
      const userData = { name, type, email, password, phoneNumber };
      if (userId) {
        userData.id = userId;
        updateUser(userId, userData)
          .then((response) => {
            navigate('/user-list');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        createUser(userData)
          .then((response) => {
            navigate('/user-list');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    const handleClear = () => {
      setName('');
      setEmail('');
      setType('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');
      setValidated(false);
      setPasswordInvalid(false);
    };

    return (
      <Paper elevation={10}>
        <CardHeader title="User Details" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  variant="outlined"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  variant="outlined"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={passwordInvalid}
                  helperText={passwordInvalid && 'Passwords do not match'}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="type">Type</InputLabel>
                  <Select
  labelId="type"
  value={type}
  label="Type"
  onChange={(e) => setType(e.target.value)}
>
  <MenuItem value="ADMIN">Admin</MenuItem>
  <MenuItem value="USER">User</MenuItem>
  <MenuItem value="SUPERWISER">Superwiser</MenuItem>
  {user && user.type === 'SUPERUSER' && <MenuItem value="SUPERUSER">Superuser</MenuItem>}
</Select>

                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="flex-end" spacing={2}>
                  <Grid item>
                    <Button type="submit" variant="contained" color="primary">
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
            </Grid>
          </form>
        </CardContent>
      </Paper>
    );
  };
  
  export default UserDetail;
