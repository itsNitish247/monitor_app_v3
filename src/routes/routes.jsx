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



const routes = [
  { path: '/dashboard', element: <Dashboard/>, exact: true },

  // Cards
   
  { path: '/users-activity', element: <UserCard/>, exact: true },
  { path: '/alerts', element: <Alerts />, exact: true },
  { path: '/problems', element: <Problems />, exact: true },


  //for add request 
  { path: '/add-request', element: <MonitorRequestList/>, exact: true },

  // for add groups
  { path: '/add-groups', element: <GroupList/>, exact: true },
  { path: '/groups-detail', element: <GroupDetails/>, exact: true },

  //for add monitor group
  { path : '/add-monitor-group' , element:<GroupRequestDetail /> , exact:true},

  { path: '/monitor-server-details', element: <ServerMonitorDetails/>, exact: true },
  { path: '/monitor-database-details', element: <DatabaseMonitorDetails/>, exact: true },
  { path: '/monitor-webservice-details', element: <WebServiceMonitorDetails/>, exact: true },

 //graphs
 { path: '/metrics', element: <ApexChart/>, exact: true },
  //for servers
  { path: '/server-list', element: <ServerList/>, exact: true },
  { path: '/server-detail', element: <ServerDetails/>, exact: true },

  // for ports 
  { path: '/ports-detail', element: <PortsDetail/>, exact: true },
  { path: '/ports-List', element: <PortList/>, exact: true },

  // for servergroup 
  { path: '/server-group-details', element: <ServerGroupDetail/>, exact: true },

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
