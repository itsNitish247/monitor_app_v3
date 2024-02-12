  // routes.js
  import React from 'react';


  import Dashboard from '../menu_items/Dashboard';
  import MonitorRequestList from '../views/Monitor_Request/Monitor_Request_List';
  import DatabaseList from '../views/Database/DatabaseList';

import ServerList from '../views/Server/ServerList';
import Servers from '../views/Server/Servers';

  const routes = [

    {
      path: '/dashboard',
      element: <Dashboard/>,
      exact: true
    },
    {
      path: '/add-request',
      element: <MonitorRequestList />,
      exact: true
    },
    {
      path: '/database',
      element: <DatabaseList />,
      exact: true
    },

    {
      path: '/servers',
      element: <Servers/>,
      exact: true
    }


  ];

  export default routes;

