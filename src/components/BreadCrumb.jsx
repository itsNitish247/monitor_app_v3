import React, { useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLocation, useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';

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
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" onClick={handleHomeClick}>
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
      <Snackbar
        open={showSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        message="You are already on the dashboard !"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    
      />
    </div>
  );
}
