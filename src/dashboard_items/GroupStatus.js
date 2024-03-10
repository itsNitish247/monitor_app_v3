// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Paper,
//   CardContent,
//   CardHeader,
//   Grid,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Skeleton,
//   Snackbar,
//   Alert,
//   Card,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from "@mui/material";

// import { getGroups } from '../api/groups-service';
// import { Refresh as RefreshIcon, ZoomIn as ZoomInIcon } from '@mui/icons-material';
// import { useTheme } from '@mui/material/styles';

// function GroupStatus() {
//   const theme = useTheme();
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   const handleRefresh = () => {
//     setLoading(true);
//     fetchGroups();
//   };

//   const fetchGroups = () => {
//     getGroups()
//       .then((response) => {
//         console.log("Groups data:", response.data);
//         setTimeout(() => {
//           setGroups(response.data);
//           setLoading(false);
//           if (response.data.length > 0) {
//             showSnackbar("Successfully fetched all Groups.", "success");
//           }
//         }, 1000);
//       })
//       .catch((error) => {
//         console.log(error);
//         showSnackbar("Error fetching groups: " + error.message, "error");
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

//   return (
// <>
//   {loading ? (
//     <Grid item xs={12}>
//       <Card elevation={3}>
//         <CardContent>
//           <Skeleton animation="wave" height={50} />
//           <Skeleton animation="wave" height={50} />
//           <Skeleton animation="wave" height={50} />
//         </CardContent>
//       </Card>
//     </Grid>
//   ) : (
//     <>
//       {groups.length === 0 ? (
//         <Grid item xs={12}>
//           <Card elevation={3}>
//             <CardHeader title="Groups" />
//             <CardContent>
//               <Typography variant="body1">Add Groups to check for Status</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ) : (
//         <>
//           {groups.map((group, index) => (
//             <Grid item xs={12} key={index}>
//               <Card elevation={3}>
//                 <CardHeader
//                   title={group.name}
//                   action={
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       startIcon={<RefreshIcon />}
//                       onClick={handleRefresh}
//                     >
//                       Refresh
//                     </Button>
//                   }
//                 />
//                 <CardContent>
//                   <Grid container spacing={2}>
//                     {/* Servers */}
//                     {group.servers && group.servers.length > 0 && (
//                       <Grid item xs={6}>
//                         <Card elevation={3}>
//                           <CardContent>
//                             <Typography variant="h6" gutterBottom>
//                               Servers
//                             </Typography>
//                             <TableContainer>
//                               <Table>
//                                 <TableHead>
//                                   <TableRow>
//                                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>Host</TableCell>
//                                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                                   </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                   {group.servers.map((server, serverIndex) => (
//                                     <TableRow key={serverIndex}>
//                                       <TableCell align="center">{server.name}</TableCell>
//                                       <TableCell align="center">{server.host}</TableCell>
//                                       <TableCell align="center">
//                                         <Button
//                                           variant="contained"
//                                           style={{
//                                             backgroundColor: server.isActive ? theme.palette.success.main : theme.palette.error.main,
//                                             color: 'white',
//                                           }}
//                                           disabled={!server.isActive}
//                                         >
//                                           {server.isActive ? "Active" : "InActive"}
//                                         </Button>
//                                       </TableCell>
//                                     </TableRow>
//                                   ))}
//                                 </TableBody>
//                               </Table>
//                             </TableContainer>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     )}

//                     {/* Web Services */}
//                     {group.webServices && group.webServices.length > 0 && (
//                       <Grid item xs={6}>
//                         <Card elevation={3}>
//                           <CardContent>
//                             <Typography variant="h6">
//                               Web Services
//                             </Typography>
//                             <TableContainer>
//                               <Table>
//                                 <TableHead>
//                                   <TableRow>
//                                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>URL</TableCell>
//                                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                                   </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                   {group.webServices.map((webService, webServiceIndex) => (
//                                     <TableRow key={webServiceIndex}>
//                                       <TableCell align="center">{webService.name}</TableCell>
//                                       <TableCell align="center">{webService.url}</TableCell>
//                                       <TableCell align="center">
//                                         <Button
//                                           variant="contained"
//                                           style={{
//                                             backgroundColor: webService.isActive ? theme.palette.success.main : theme.palette.error.main,
//                                             color: 'white',
//                                           }}
//                                           disabled={!webService.isActive}
//                                         >
//                                           {webService.isActive ? "Active" : "InActive"}
//                                         </Button>
//                                       </TableCell>
//                                     </TableRow>
//                                   ))}
//                                 </TableBody>
//                               </Table>
//                             </TableContainer>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     )}

//                     {/* Databases */}
//                     {group.databases && group.databases.length > 0 && (
//                       <Grid item xs={6}>
//                         <Card elevation={3}>
//                           <CardContent>
//                             <Typography variant="h6" gutterBottom>
//                               Databases
//                             </Typography>
//                             <TableContainer>
//                               <Table>
//                                 <TableHead>
//                                   <TableRow>
//                                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>Url</TableCell>
//                                     <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                                   </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                   {group.databases.map((database, databaseIndex) => (
//                                     <TableRow key={databaseIndex}>
//                                       <TableCell align="center">{database.name}</TableCell>
//                                       <TableCell align="center">{database.url}</TableCell>
//                                       <TableCell align="center">
//                                         <Button
//                                           variant="contained"
//                                           style={{
//                                             backgroundColor: database.isActive ? theme.palette.success.main : theme.palette.error.main,
//                                             color: 'white',
//                                           }}
//                                           disabled={!database.isActive}
//                                         >
//                                           {database.isActive ? "Active" : "InActive"}
//                                         </Button>
//                                       </TableCell>
//                                     </TableRow>
//                                   ))}
//                                 </TableBody>
//                               </Table>
//                             </TableContainer>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     )}
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//           <Snackbar
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             open={snackbarOpen}
//             autoHideDuration={3000}
//             onClose={handleCloseSnackbar}
//           >
//             <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//               {snackbarMessage}
//             </Alert>
//           </Snackbar>
//         </>
//       )}
//     </>
//   )}
// </>
//   );
//                                         }
// export default GroupStatus;



import React, { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Snackbar,
  Alert,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import { getGroups } from '../api/groups-service';
import { Refresh as RefreshIcon, ZoomIn as ZoomInIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

function GroupStatus() {
  const theme = useTheme();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Dialog States
  const [openActiveDialog, setOpenActiveDialog] = useState(false);
  const [openInactiveDialog, setOpenInactiveDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchGroups();
  };

  const fetchGroups = () => {
    getGroups()
      .then((response) => {
        console.log("Groups data:", response.data);
        setTimeout(() => {
          setGroups(response.data);
          setLoading(false);
          if (response.data.length > 0) {
            showSnackbar("Successfully fetched all Groups.", "success");
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        showSnackbar("Error fetching groups: " + error.message, "error");
      });
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Dialog Handlers
  const handleOpenActiveDialog = (group) => {
    setSelectedGroup(group);
    setOpenActiveDialog(true);
  };

  const handleCloseActiveDialog = () => {
    setOpenActiveDialog(false);
  };

  const handleOpenInactiveDialog = (group) => {
    setSelectedGroup(group);
    setOpenInactiveDialog(true);
  };

  const handleCloseInactiveDialog = () => {
    setOpenInactiveDialog(false);
  };

  return (
    <>
      {loading ? (
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <>
          {groups.length === 0 ? (
            <Grid item xs={12}>
              <Card elevation={3}>
                <CardHeader title="Groups" />
                <CardContent>
                  <Typography variant="body1">Add Groups to check for Status</Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <>
              {groups.map((group, index) => (
                <Grid item xs={12} key={index}>
                  <Card elevation={3}>
                    <CardHeader
                      title={group.name}
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
                      <Grid container spacing={2}>
                        {/* Active Dialog */}
                        <Grid item xs={3} >
                          <Card elevation={3} >
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                Active Items
                              </Typography>
                              <Button  variant="contained" color='success' sx={{width:"100px" , marginTop:2}} onClick={() => handleOpenActiveDialog(group)}>Open Active items</Button>
                              {/* Active Dialog */}
                              <Dialog
                                open={openActiveDialog}
                                onClose={handleCloseActiveDialog}
                                aria-labelledby="active-dialog-title"
                              >
                                <DialogTitle id="active-dialog-title">Active Items</DialogTitle>
                                <DialogContent>
                                  {/* Active Items Content */}
                                  <TableContainer>
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>Host/URL</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {selectedGroup?.servers.concat(selectedGroup.webServices, selectedGroup.databases).map((item, itemIndex) => (
                                          item.isActive && (
                                            <TableRow key={itemIndex}>
                                              <TableCell align="center">{item.name}</TableCell>
                                              <TableCell align="center">{item.host || item.url}</TableCell>
                                            </TableRow>
                                          )
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleCloseActiveDialog}>Close</Button>
                                </DialogActions>
                              </Dialog>
                            </CardContent>
                          </Card>
                        </Grid>

                        {/* Inactive Dialog */}
                        <Grid item xs={3}>
                          <Card elevation={3}>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                Inactive Items
                              </Typography>
                              <Button variant='contained' color='error'  sx={{width:"100px" , marginTop:2}} onClick={() => handleOpenInactiveDialog(group)}>Open Inactive Items</Button>
                            
                              {/* Inactive Dialog */}
                              <Dialog
                                open={openInactiveDialog}
                                onClose={handleCloseInactiveDialog}
                                aria-labelledby="inactive-dialog-title"
                              >
                                <DialogTitle id="inactive-dialog-title">Inactive Items</DialogTitle>
                                <DialogContent>
                                  {/* Inactive Items Content */}
                                  <TableContainer>
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                          <TableCell align="center" sx={{ fontWeight: 'bold' }}>Host/URL</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {selectedGroup?.servers.concat(selectedGroup.webServices, selectedGroup.databases).map((item, itemIndex) => (
                                          !item.isActive && (
                                            <TableRow key={itemIndex}>
                                              <TableCell align="center">{item.name}</TableCell>
                                              <TableCell align="center">{item.host || item.url}</TableCell>
                                            </TableRow>
                                          )
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleCloseInactiveDialog}>Close</Button>
                                </DialogActions>
                              </Dialog>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
              >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </>
          )}
        </>
      )}
    </>
  );
}

export default GroupStatus;

// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Grid,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Refresh as RefreshIcon } from '@mui/icons-material';
// import { getGroups } from '../api/groups-service';

// function GroupStatus() {
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   // Dialog States
//   const [openActiveServersDialog, setOpenActiveServersDialog] = useState(false);
//   const [openInactiveServersDialog, setOpenInactiveServersDialog] = useState(false);
//   const [openActiveWebServicesDialog, setOpenActiveWebServicesDialog] = useState(false);
//   const [openInactiveWebServicesDialog, setOpenInactiveWebServicesDialog] = useState(false);
//   const [openActiveDatabasesDialog, setOpenActiveDatabasesDialog] = useState(false);
//   const [openInactiveDatabasesDialog, setOpenInactiveDatabasesDialog] = useState(false);

//   useEffect(() => {
//     fetchGroups();
//   }, []);

//   const handleRefresh = () => {
//     setLoading(true);
//     fetchGroups();
//   };

//   const fetchGroups = () => {
//     getGroups()
//       .then((response) => {
//         console.log("Groups data:", response.data);
//         setTimeout(() => {
//           setGroups(response.data);
//           setLoading(false);
//           if (response.data.length > 0) {
//             showSnackbar("Successfully fetched all Groups.", "success");
//           }
//         }, 1000);
//       })
//       .catch((error) => {
//         console.log(error);
//         showSnackbar("Error fetching groups: " + error.message, "error");
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

//   // Dialog Handlers
//   const handleOpenActiveServersDialog = () => {
//     setOpenActiveServersDialog(true);
//   };

//   const handleCloseActiveServersDialog = () => {
//     setOpenActiveServersDialog(false);
//   };

//   const handleOpenInactiveServersDialog = () => {
//     setOpenInactiveServersDialog(true);
//   };

//   const handleCloseInactiveServersDialog = () => {
//     setOpenInactiveServersDialog(false);
//   };

//   const handleOpenActiveWebServicesDialog = () => {
//     setOpenActiveWebServicesDialog(true);
//   };

//   const handleCloseActiveWebServicesDialog = () => {
//     setOpenActiveWebServicesDialog(false);
//   };

//   const handleOpenInactiveWebServicesDialog = () => {
//     setOpenInactiveWebServicesDialog(true);
//   };

//   const handleCloseInactiveWebServicesDialog = () => {
//     setOpenInactiveWebServicesDialog(false);
//   };

//   const handleOpenActiveDatabasesDialog = () => {
//     setOpenActiveDatabasesDialog(true);
//   };

//   const handleCloseActiveDatabasesDialog = () => {
//     setOpenActiveDatabasesDialog(false);
//   };

//   const handleOpenInactiveDatabasesDialog = () => {
//     setOpenInactiveDatabasesDialog(true);
//   };

//   const handleCloseInactiveDatabasesDialog = () => {
//     setOpenInactiveDatabasesDialog(false);
//   };

//   return (
//     <>
//       {loading ? (
//         <Grid item xs={12}>
//           <Card elevation={3}>
//             <CardContent>
//               <Typography>Loading...</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ) : groups.length === 0 ? (
//         <Grid item xs={12}>
//           <Card elevation={3}>
//             <CardHeader title="Groups" />
//             <CardContent>
//               <Typography variant="body1">Add Groups to check for Status</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ) : (
//         <>
//         {groups.map((group) => (
//   <Grid item xs={12} key={group.id}>
//               <Card elevation={3}>
//                 <CardHeader
//                   title={group.name}
//                   action={
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       startIcon={<RefreshIcon />}
//                       onClick={handleRefresh}
//                     >
//                       Refresh
//                     </Button>
//                   }
//                 />
//                 <CardContent>
//                   <Grid container spacing={2}>
//                     {/* Servers */}
//                     {group.servers.length > 0 && (
//                       <Grid item xs={6}>
//                         <Card elevation={3}>
//                           <CardContent>
//                             <Typography variant="h6" gutterBottom>
//                               Servers
//                             </Typography>
//                             <Button
//                               variant='contained'
//                               color='success'
//                               onClick={handleOpenActiveServersDialog}
//                               sx={{ marginTop: 2, marginRight: 2, width: 100, height: 40 }}
//                             >
//                               Active Servers
//                             </Button>
//                             {/* Active Servers Dialog */}
//                             <Dialog
//                               open={openActiveServersDialog}
//                               onClose={handleCloseActiveServersDialog}
//                               aria-labelledby="active-servers-dialog-title"
//                             >
//                               <DialogTitle id="active-servers-dialog-title">Active Servers</DialogTitle>
//                               <DialogContent>
//                                 {/* Active Servers Content */}
//                                 <TableContainer>
//                                   <Table>
//                                     <TableHead>
//                                       <TableRow>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>Host</TableCell>
//                                       </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                       {group.servers.map((server, serverIndex) => (
//                                         server.isActive && (
//                                           <TableRow key={serverIndex}>
//                                             <TableCell align="center">{server.name}</TableCell>
//                                             <TableCell align="center">{server.host}</TableCell>
//                                           </TableRow>
//                                         )
//                                       ))}
//                                     </TableBody>
//                                   </Table>
//                                 </TableContainer>
//                               </DialogContent>
//                               <DialogActions>
//                                 <Button onClick={handleCloseActiveServersDialog}>Close</Button>
//                               </DialogActions>
//                             </Dialog>
//                             <Button
//                               variant='contained'
//                               color='error'
//                               onClick={handleOpenInactiveServersDialog}
//                               sx={{ marginTop: 2, width: 100, height: 40 }}
//                             >
//                               Inactive Servers
//                             </Button>
//                             {/* Inactive Servers Dialog */}
//                             <Dialog
//                               open={openInactiveServersDialog}
//                               onClose={handleCloseInactiveServersDialog}
//                               aria-labelledby="inactive-servers-dialog-title"
//                             >
//                               <DialogTitle id="inactive-servers-dialog-title">Inactive Servers</DialogTitle>
//                               <DialogContent>
//                                 {/* Inactive Servers Content */}
//                                 <TableContainer>
//                                   <Table>
//                                     <TableHead>
//                                       <TableRow>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>Host</TableCell>
//                                       </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                       {group.servers.map((server, serverIndex) => (
//                                         !server.isActive && (
//                                           <TableRow key={serverIndex}>
//                                             <TableCell align="center">{server.name}</TableCell>
//                                             <TableCell align="center">{server.host}</TableCell>
//                                           </TableRow>
//                                         )
//                                       ))}
//                                     </TableBody>
//                                   </Table>
//                                 </TableContainer>
//                               </DialogContent>
//                               <DialogActions>
//                                 <Button onClick={handleCloseInactiveServersDialog}>Close</Button>
//                               </DialogActions>
//                             </Dialog>
//                             <Button color='primary' sx={{ marginTop: 2, marginLeft: 2, width: 50, height: 40 }}>View graph</Button>
//                             <Button color='primary' sx={{ marginTop: 2, marginLeft: 2, width: 50, height: 40 }}>View items</Button>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     )}

//                     {/* Web Services */}
//                     {group.webServices.length > 0 && (
//                       <Grid item xs={6}>
//                         <Card elevation={3}>
//                           <CardContent>
//                             <Typography variant="h6">
//                               Web Services
//                             </Typography>
//                             <Button
//                               variant='contained'
//                               color='success'
//                               onClick={handleOpenActiveWebServicesDialog}
//                               sx={{ marginTop: 2, marginRight: 2, width: 100, height: 40 }}
//                             >
//                               Active Web Services
//                             </Button>
//                             {/* Active Web Services Dialog */}
//                             <Dialog
//                               open={openActiveWebServicesDialog}
//                               onClose={handleCloseActiveWebServicesDialog}
//                               aria-labelledby="active-webservices-dialog-title"
//                             >
//                               <DialogTitle id="active-webservices-dialog-title">Active Web Services</DialogTitle>
//                               <DialogContent>
//                                 {/* Active Web Services Content */}
//                                 <TableContainer>
//                                   <Table>
//                                     <TableHead>
//                                       <TableRow>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>URL</TableCell>
//                                       </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                       {group.webServices.map((webService, webServiceIndex) => (
//                                         webService.isActive && (
//                                           <TableRow key={webServiceIndex}>
//                                             <TableCell align="center">{webService.name}</TableCell>
//                                             <TableCell align="center">{webService.url}</TableCell>
//                                           </TableRow>
//                                         )
//                                       ))}
//                                     </TableBody>
//                                   </Table>
//                                 </TableContainer>
//                               </DialogContent>
//                               <DialogActions>
//                                 <Button onClick={handleCloseActiveWebServicesDialog}>Close</Button>
//                               </DialogActions>
//                             </Dialog>
//                             <Button
//                               variant='contained'
//                               color='error'
//                               onClick={handleOpenInactiveWebServicesDialog}
//                               sx={{ marginTop: 2, width: 100, height: 40 }}
//                             >
//                               Inactive Web Services
//                             </Button>
//                             {/* Inactive Web Services Dialog */}
//                             <Dialog
//                               open={openInactiveWebServicesDialog}
//                               onClose={handleCloseInactiveWebServicesDialog}
//                               aria-labelledby="inactive-webservices-dialog-title"
//                             >
//                               <DialogTitle id="inactive-webservices-dialog-title">Inactive Web Services</DialogTitle>
//                               <DialogContent>
//                                 {/* Inactive Web Services Content */}
//                                 <TableContainer>
//                                   <Table>
//                                     <TableHead>
//                                       <TableRow>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>URL</TableCell>
//                                       </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                       {group.webServices.map((webService, webServiceIndex) => (
//                                         !webService.isActive && (
//                                           <TableRow key={webServiceIndex}>
//                                             <TableCell align="center">{webService.name}</TableCell>
//                                             <TableCell align="center">{webService.url}</TableCell>
//                                           </TableRow>
//                                         )
//                                       ))}
//                                     </TableBody>
//                                   </Table>
//                                 </TableContainer>
//                               </DialogContent>
//                               <DialogActions>
//                                 <Button onClick={handleCloseInactiveWebServicesDialog}>Close</Button>
//                               </DialogActions>
//                             </Dialog>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     )}

//                     {/* Databases */}
//                     {group.databases.length > 0 && (
//                       <Grid item xs={6}>
//                         <Card elevation={3}>
//                           <CardContent>
//                             <Typography variant="h6" gutterBottom>
//                               Databases
//                             </Typography>
//                             <Button
//                               variant='contained'
//                               color='success'
//                               onClick={handleOpenActiveDatabasesDialog}
//                               sx={{ marginTop: 2, marginRight: 2, width: 100, height: 40 }}
//                             >
//                               Active Databases
//                             </Button>
//                             {/* Active Databases Dialog */}
//                             <Dialog
//                               open={openActiveDatabasesDialog}
//                               onClose={handleCloseActiveDatabasesDialog}
//                               aria-labelledby="active-databases-dialog-title"
//                             >
//                               <DialogTitle id="active-databases-dialog-title">Active Databases</DialogTitle>
//                               <DialogContent>
//                                 {/* Active Databases Content */}
//                                 <TableContainer>
//                                   <Table>
//                                     <TableHead>
//                                       <TableRow>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>URL</TableCell>
//                                       </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                       {group.databases.map((database, databaseIndex) => (
//                                         database.isActive && (
//                                           <TableRow key={databaseIndex}>
//                                             <TableCell align="center">{database.name}</TableCell>
//                                             <TableCell align="center">{database.url}</TableCell>
//                                           </TableRow>
//                                         )
//                                       ))}
//                                     </TableBody>
//                                   </Table>
//                                 </TableContainer>
//                               </DialogContent>
//                               <DialogActions>
//                                 <Button onClick={handleCloseActiveDatabasesDialog}>Close</Button>
//                               </DialogActions>
//                             </Dialog>
//                             <Button
//                               variant='contained'
//                               color='error'
//                               onClick={handleOpenInactiveDatabasesDialog}
//                               sx={{ marginTop: 2, width: 100, height: 40 }}
//                             >
//                               Inactive Databases
//                             </Button>
//                             {/* Inactive Databases Dialog */}
//                             <Dialog
//                               open={openInactiveDatabasesDialog}
//                               onClose={handleCloseInactiveDatabasesDialog}
//                               aria-labelledby="inactive-databases-dialog-title"
//                             >
//                               <DialogTitle id="inactive-databases-dialog-title">Inactive Databases</DialogTitle>
//                               <DialogContent>
//                                 {/* Inactive Databases Content */}
//                                 <TableContainer>
//                                   <Table>
//                                     <TableHead>
//                                       <TableRow>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                                         <TableCell align="center" sx={{ fontWeight: 'bold' }}>URL</TableCell>
//                                       </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                       {group.databases.map((database, databaseIndex) => (
//                                         !database.isActive && (
//                                           <TableRow key={databaseIndex}>
//                                             <TableCell align="center">{database.name}</TableCell>
//                                             <TableCell align="center">{database.url}</TableCell>
//                                           </TableRow>
//                                         )
//                                       ))}
//                                     </TableBody>
//                                   </Table>
//                                 </TableContainer>
//                               </DialogContent>
//                               <DialogActions>
//                                 <Button onClick={handleCloseInactiveDatabasesDialog}>Close</Button>
//                               </DialogActions>
//                             </Dialog>
//                           </CardContent>
//                         </Card>
//                       </Grid>
//                     )}
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//           <Snackbar
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             open={snackbarOpen}
//             autoHideDuration={3000}
//             onClose={handleCloseSnackbar}
//           >
//             <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//               {snackbarMessage}
//             </Alert>
//           </Snackbar>
//         </>
//       )}
//     </>
//   );
// }

// export default GroupStatus;
