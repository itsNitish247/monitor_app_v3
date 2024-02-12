import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ActiveLastBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
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
    </div>
  );
}
