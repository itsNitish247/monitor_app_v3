import React from 'react';
import Dashboard from '../dashboard_items/Dashboard';
import DatabaseList from '../views/Database/DatabaseList';
import ServerList from '../views/Server/ServerList';
import ServerDetails from '../views/Server/ServerDetails';
import DatabaseDetail from '../views/Database/DatabaseDetails';
import WebServiceDetail from '../views/Webservice/WebServiceDetail';
import WebServiceList from '../views/Webservice/WebServiceList';
import UserDetail from '../views/User/UserDetail';
import UserList from '../views/User/UserList';
import MonitorRequestList from '../views/Monitor_Request/Montior_requestList'
import ServerMonitorDetails from '../views/Monitor_Request/Server_Requests/Monitor_Server_RequestDetails';
import DatabaseMonitorDetails from '../views/Monitor_Request/Database_Requests/Monitor_DatabaseRequestDetails';
import WebServiceMonitorDetails from '../views/Monitor_Request/Webservice_Request.js/Monitor_WebserviceRequestDetails';
import GroupList from '../views/Group/GroupList';
import ServerGroupDetail from '../views/server-group/Server_Group_Details';
import ApexChart from '../dashboard_items/charts/cpu';
import UserCard from '../dashboard_items/cards/userCard';
import PortsDetail from '../views/Ports/PortsDetail';
import PortList from '../views/Ports/PortsList';
import GroupDetails from '../views/Group/GroupDetail';
import Alerts from '../dashboard_items/cards/alerts';
import GroupRequestDetail from '../views/GroupRequest/Group_Request_Detail';
import Problems from '../dashboard_items/cards/problems';
import EmailCard from '../dashboard_items/cards/emailCard';
import Graph from '../dashboard_items/charts/Graph';



const routes = [
  { path: '/Dashboard', element: <Dashboard/>, exact: true },

  // Cards
    { path: '/Users-activity', element: <UserCard/>, exact: true },
  { path: '/Alerts', element: <Alerts />, exact: true },
  { path: '/Problems', element: <Problems />, exact: true },
  { path: '/Email', element: <EmailCard />, exact: true },


  //for add request 
  { path: '/Add-request', element: <MonitorRequestList/>, exact: true },

  // for add groups
  { path: '/Add-groups', element: <GroupList/>, exact: true },
  { path: '/Groups-detail', element: <GroupDetails/>, exact: true },

  //for add monitor group
  { path : '/Add-monitor-group' , element:<GroupRequestDetail /> , exact:true},

  { path: '/Monitor-server-details', element: <ServerMonitorDetails/>, exact: true },
  { path: '/Monitor-database-details', element: <DatabaseMonitorDetails/>, exact: true },
  { path: '/Monitor-webservice-details', element: <WebServiceMonitorDetails/>, exact: true },

 //graphs
 { path: '/Metrics', element: <Graph/>, exact: true },
  //for servers
  { path: '/Server-list', element: <ServerList/>, exact: true },
  { path: '/Server-detail', element: <ServerDetails/>, exact: true },

  // for ports 
  { path: '/Ports-detail', element: <PortsDetail/>, exact: true },
  { path: '/Ports-List', element: <PortList/>, exact: true },

  // for servergroup 
  { path: '/Server-group-details', element: <ServerGroupDetail/>, exact: true },

//for database
  { path: '/Database-detail', element: <DatabaseDetail/>, exact: true },
  { path: '/Database-list', element: <DatabaseList/>, exact: true },

  //for webservice
  { path: '/Webservice-detail', element: <WebServiceDetail/>, exact: true },
  { path: '/Webservice-list', element: <WebServiceList/>, exact: true },


  //for uses
  { path: '/User-detail', element: <UserDetail/>, exact: true },
  { path: '/User-list', element: <UserList/>, exact: true },

 
];
  
export default routes;
