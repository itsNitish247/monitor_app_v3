import React from 'react';
import Dashboard from '../menu_items/Dashboard';
import MonitorRequestList from '../views/Monitor_Request/Monitor_Request_List';
import DatabaseList from '../views/Database/DatabaseList';
import ServerList from '../views/Server/ServerList';
import ServerDetails from '../views/Server/ServerDetails';
import DatabaseDetail from '../views/Database/DatabaseDetails';
import WebServiceDetail from '../views/Webservice/WebServiceDetail';
import WebServiceList from '../views/Webservice/WebServiceList';
import UserDetail from '../views/User/UserDetail';
import UserList from '../views/User/UserList';

const routes = [
  { path: '/dashboard', element: <Dashboard/>, exact: true },
  { path: '/add-request', element: <MonitorRequestList/>, exact: true },
 
  //for servers
  { path: '/server-list', element: <ServerList/>, exact: true },
  { path: '/server-detail', element: <ServerDetails/>, exact: true },

//for database
  { path: '/database-detail', element: <DatabaseDetail/>, exact: true },
  { path: '/database-list', element: <DatabaseList/>, exact: true },

  //for webservice
  { path: '/webservice-detail', element: <WebServiceDetail/>, exact: true },
  { path: '/webservice-list', element: <WebServiceList/>, exact: true },


  //for uses
  { path: '/user-detail', element: <UserDetail/>, exact: true },
  { path: '/user-list', element: <UserList/>, exact: true },
];

export default routes;
