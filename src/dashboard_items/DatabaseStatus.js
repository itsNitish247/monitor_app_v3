// import React, { useState, useEffect } from 'react';
// import { Grid, Card, CardHeader, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Button, Snackbar, Alert, Skeleton } from '@mui/material';
// import { Refresh as RefreshIcon } from '@mui/icons-material';
// import {getDatabaseRequest , } from '../api/database-service';

// function DatabaseStatus() {
//   const [loading, setLoading] = useState(true);
//   const [databaseData, setDatabaseData] = useState([]);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   useEffect(() => {
//     fetchDatabases();
//   }, []);

//   const fetchDatabases = () => {
//     getDatabaseRequest()
//       .then((response) => {
//         console.log("Database data:", response.data);
//         setTimeout(() => {
//         setDatabaseData(response.data);
//         setLoading(false);
//         if (response.data.length > 0) {
//           handleSnackbar("Successfully fetched all Databases", "success");
//         }
//         },1000);
//       })
//       .catch((error) => {
//         console.error(error);
//         handleSnackbar("Error fetching databases:"  + error.message, "error");
//       });
//   };

//   const handleSnackbar = (message, severity) => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };
//   const handleCloseSnackbar = () => {
//     setSnackbarOpen(false);
//   };

//   const handleRefresh = () => {
//     setLoading(true);
//     fetchDatabases();
//   };

//   return (
 
//       <Grid item xs={12}>
//         <Card elevation={3}>
//           <CardHeader
//             title="Database Status"
//             action={
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 startIcon={<RefreshIcon />}
//                 onClick={handleRefresh}
//               >
//                 Refresh
//               </Button>
//             }
//           />
//           <CardContent>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Database Name</TableCell>
//                   <TableCell>Active Status</TableCell>
//                   <TableCell></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={3}>
//                       <Skeleton />
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   databaseData.map((database) => (
//                     <TableRow key={database.name}>
//                       <TableCell>{database.name}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color={database.isActive ? 'success' : 'error'}
//                           disabled={!database.isActive}
//                         >
//                           {database.isActive ? 'Active' : 'InActive'}
//                         </Button>
//                       </TableCell>
//                       <TableCell>
//                         {/* <Button
//                           onClick={() => handleZoomInClickForDatabase(database)}
//                           style={{ cursor: 'pointer' }}
//                         >
//                           Zoom In
//                         </Button> */}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
   
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

// export default DatabaseStatus;
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { getDatabaseRequest } from '../api/database-service';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
function DatabaseStatus() {
  const { enqueueSnackbar } = useSnackbar(); 
  const [loading, setLoading] = useState(true);
  const [databaseData, setDatabaseData] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    fetchDatabases();
  }, []);

  const fetchDatabases = () => {
    getDatabaseRequest()
      .then((response) => {
        console.log("Database data:", response.data);
        setTimeout(() => {
          setDatabaseData(response.data);
          setLoading(false);
          if (response.data.length > 0) {
            handleSnackbar("Successfully fetched all Databases", "success");
          }
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        handleSnackbar("Error fetching databases:" + error.message, "error");
      });
  };

  const handleSnackbar = (message, severity) => {
    enqueueSnackbar(message, { variant: severity }); 
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchDatabases();
  };

  return (
    <Grid item xs={12}>
      <Card elevation={3}>
        <CardHeader
          title="Database Status"
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
                <TableCell>Database Name</TableCell>
                <TableCell>Active Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3}>Loading...</TableCell>
                </TableRow>
              ) : (
                databaseData.map((database) => (
                  <TableRow key={database.name}>
                    <TableCell>{database.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: database.isActive ? theme.palette.success.main : theme.palette.error.main,
                          color: 'white',
                        }}
                        disabled={!database.isActive}
                      >
                        {database.isActive ? "Active" : "InActive"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {/* <Button
                        onClick={() => handleZoomInClickForDatabase(database)}
                        style={{ cursor: 'pointer' }}
                      >
                        Zoom In
                      </Button> */}
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
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <DatabaseStatus />
    </SnackbarProvider>
  );
}

