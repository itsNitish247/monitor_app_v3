import React, { useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbar, Card, CardContent, Grid, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { purple } from '@mui/material/colors';
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ActiveLastBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleHomeClick = () => {
    if (location.pathname !== '/dashboard') {
      navigate("/dashboard");
    } else {
      setShowSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Grid container>
      <Grid item xs={12} onClick={handleClick}>
        <Card variant="outlined">
          <CardContent style={{ padding: '8px' }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6" component="div" fontSize={16}>
                  {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                      <Link
                        key={name}
                        underline="hover"
                        color="text.primary"
                        aria-current="page"
                      >
                        {name}
                      </Link>
                    ) : (
                      <Link
                        key={name}
                        underline="hover"
                        color="inherit"
                        href={routeTo}
                      >
                        {name}
                      </Link>
                    );
                  })}
                </Typography>
              </Grid>
              <Grid item>
                <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '1rem'}}>
                <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 , color :'#5e35b1'}} fontSize="inherit" />
          Home
        </Link>
                  {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                      <Link
                        key={name}
                        underline="hover"
                        color="text.primary"
                        aria-current="page"
                      >
                        {name}
                      </Link>
                    ) : (
                      <Link
                        key={name}
                        underline="hover"
                        color="inherit"
                        href={routeTo}
                      >
                        {name}
                      </Link>
                    );
                  })}
                </Breadcrumbs>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={1000}
          onClose={handleCloseSnackbar}
          message="You are already on the dashboard !"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
      </Grid>
    </Grid>
  );
}
