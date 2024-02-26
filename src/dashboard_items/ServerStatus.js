// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Card,
//   CardHeader,
//   CardContent,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   Snackbar,
//   Alert,
//   Skeleton
// } from '@mui/material';
// import { Refresh as RefreshIcon, ZoomIn as ZoomInIcon } from '@mui/icons-material';
// import { getServers } from "../api/server-service";
// import { useTheme } from '@mui/material/styles';


// function ServerStatus() {
//   const theme = useTheme();
//   const [loading, setLoading] = useState(true);
//   const [serverData, setServerData] = useState([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   console.log(theme.palette.primary.main);
//   useEffect(() => {
//     fetchServers();
//   }, []);

//   const handleRefresh = () => {
//     setLoading(true);
//     fetchServers();
//   };

//   const fetchServers = () => {
//     getServers()
//       .then((response) => {
//         console.log("Server data:", response.data);
//         setTimeout(() => {
//           setServerData(response.data);
//           setLoading(false);
//           if (response.data.length > 0) {
//             showSnackbar("Successfully fetched all Servers.", "success");
//           }
//         }, 1000);
//       })
//       .catch((error) => {
//         console.log(error);
//         showSnackbar("Error fetching servers: " + error.message, "error");
//       });
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   const handleZoomInClick = () => {
//     console.log('Zoom in clicked');
//   };

//   return (
//     <Grid item xs={12}>
//       <Card elevation={3}>
//         <CardHeader
//           title="Server Status"
//           action={
//             <Button
//               variant="contained"
//               color="secondary"
//               startIcon={<RefreshIcon />}
//               onClick={handleRefresh}
//             >
//               Refresh
//             </Button>
//           }
//         />
//         <CardContent>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Server Name</TableCell>
//                 <TableCell>Host</TableCell>
//                 <TableCell>Active Status</TableCell>
//                 <TableCell></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={4}>
//                     <Skeleton animation="wave" />
//                     <Skeleton animation="wave" />
//                     <Skeleton animation="wave" />
//                     <Skeleton animation="wave" />
//                   </TableCell>
//                 </TableRow>
//               ) : serverData.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={4}>Add Monitor Server Request To check status...</TableCell>
//                 </TableRow>
//               ) : (
//                 serverData.map((server) => (
//                   <TableRow key={server.serverName}>
//                     <TableCell>{server.name}</TableCell>
//                     <TableCell>{server.host}</TableCell>
//                     <TableCell>
//                     <Button
//     variant="contained"
//     style={{
//         backgroundColor: server.isActive ? theme.palette.success.main : theme.palette.error.main,
//         color: 'white',
//     }}
//     disabled={!server.isActive}
// >
//     {server.isActive ? "Active" : "InActive"}
// </Button>




//                     </TableCell>
//                     <TableCell>
//                       <ZoomInIcon
//                         onClick={handleZoomInClick}
//                         style={{ cursor: 'pointer' }}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <Snackbar
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Grid>
//   );
// }

// export default ServerStatus;

import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Refresh as RefreshIcon, ZoomIn as ZoomInIcon } from '@mui/icons-material';
import { getServers } from "../api/server-service";
import { useTheme } from '@mui/material/styles';
import { SnackbarProvider, useSnackbar } from 'notistack'; // Importing from notistack

function ServerStatus() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar(); // Destructuring enqueueSnackbar from useSnackbar
  const [loading, setLoading] = useState(true);
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    fetchServers();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchServers();
  };

  const fetchServers = () => {
    getServers()
      .then((response) => {
        console.log("Server data:", response.data);
        setTimeout(() => {
          setServerData(response.data);
          setLoading(false);
          if (response.data.length > 0) {
            showSnackbar("Successfully fetched all Server statuses.", "success");
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        showSnackbar("Error fetching servers: " + error.message, "error");
      });
  };

  const showSnackbar = (message, severity) => {
    enqueueSnackbar(message, { variant: severity }); 
  };

  const handleZoomInClick = () => {
    console.log('Zoom in clicked');
  };

  return (
    <Grid item xs={12}>
      <Card elevation={3}>
        <CardHeader
          title="Server Status"
          action={
            <Button
              variant="contained"
              color="secondary"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          }
        />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Server Name</TableCell>
                <TableCell>Host</TableCell>
                <TableCell>Active Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading...</TableCell>
                </TableRow>
              ) : serverData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>Add Monitor Server Request To check status...</TableCell>
                </TableRow>
              ) : (
                serverData.map((server) => (
                  <TableRow key={server.serverName}>
                    <TableCell>{server.name}</TableCell>
                    <TableCell>{server.host}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: server.isActive ? theme.palette.success.main : theme.palette.error.main,
                          color: 'white',
                        }}
                        disabled={!server.isActive}
                      >
                        {server.isActive ? "Active" : "InActive"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <ZoomInIcon
                        onClick={handleZoomInClick}
                        style={{ cursor: 'pointer' }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ServerStatus />
    </SnackbarProvider>
  );
}

