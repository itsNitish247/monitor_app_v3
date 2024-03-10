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
//   Alert
// } from "@mui/material";
// import { Add as AddIcon, Refresh as RefreshIcon } from "@mui/icons-material";
// import { getGroups } from '../../api/groups-service';
// import { Link as RouterLink } from "react-router-dom";
// import CustomTablePagination from '../../pagination/pagination';
// import DeleteIcon from '@mui/icons-material/Delete';

// function GroupsList() {
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [page, setPage] = useState(0);
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

//   const handleChangePage = (newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (value) => {
//     setRowsPerPage(value);
//     setPage(0);
//   };

//   return (
//     <Grid container spacing={1}>
//       <Grid item xs={12}>
//         <Paper elevation={10}>
//           <CardHeader
//             title="Groups List"
//             action={
//               <>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   startIcon={<RefreshIcon />}
//                   onClick={handleRefresh}
//                 >
//                   Refresh
//                 </Button>
//                 <Button
//                   component={RouterLink}
//                   to="/groups-detail"
//                   variant="contained"
//                   color="primary"
//                   startIcon={<AddIcon />}
//                   sx={{ marginLeft: 2 }}
//                 >
//                   Add Group
//                 </Button>
//               </>
//             }
//           />
//           <CardContent>
//             <Typography variant="body2" color="text.secondary">
//               List of all groups
//             </Typography>
//             {loading ? (
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>
//                         <Skeleton />
//                       </TableCell>
//                       <TableCell>
//                         <Skeleton />
//                       </TableCell>
//                       <TableCell>
//                         <Skeleton />
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {[...Array(rowsPerPage)].map((_, index) => (
//                       <TableRow key={index}>
//                         <TableCell>
//                           <Skeleton />
//                         </TableCell>
//                         <TableCell>
//                           <Skeleton />
//                         </TableCell>
//                         <TableCell>
//                           <Skeleton />
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             ) : groups.length === 0 ? (
//               <Typography variant="body3" className="text-secondary">
//                 No Groups Added Yet...
//               </Typography>
//             ) : (
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Group Name</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Users</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}></TableCell>
                      
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {groups
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map((item) => (
//                         <TableRow
//                           key={item.id}
//                           sx={{
//                             '&:hover': {
//                               border: '2px solid blue',
//                             }
//                           }}
//                         >
//                           <TableCell align="center">{item.id}</TableCell>
//                           <TableCell align="center">{item.name}</TableCell>
//                           <TableCell align="center">
//   {item.users.map((user, index) => (
//     <div key={index}>
//       {user.name}
//     </div>
//   ))}
// </TableCell>
//  <TableCell align="center"><DeleteIcon /></TableCell>

//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             )}
//             <CustomTablePagination
//               count={groups.length}
//               page={page}
//               rowsPerPage={rowsPerPage}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </CardContent>
//         </Paper>
//       </Grid>
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

// export default GroupsList;
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
  Alert
} from "@mui/material";
import { Add as AddIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import { getGroups } from '../../api/groups-service';
import { Link as RouterLink } from "react-router-dom";
import CustomTablePagination from '../../pagination/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppStore } from '../../appStore';

function GroupsList() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const userType = useAppStore(state => state.userType);
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

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const handleDelete = (id) => {

    setGroups(groups.filter(group => group.id !== id));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper elevation={10}>
          <CardHeader
            title="Groups List"
            action={
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                >
                  Refresh
                </Button>
                {userType !== 'USER' && userType !== 'SUPERWISER' && (
                <Button
                  component={RouterLink}
                  to="/groups-detail"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ marginLeft: 2 }}
                >
                  Add Group
                </Button>
                )}
              </>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              List of all groups
            </Typography>
            {loading ? (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                      <TableCell>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[...Array(rowsPerPage)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : groups.length === 0 ? (
              <Typography variant="body3" className="text-secondary">
                No Groups Added Yet...
              </Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Group Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Users</TableCell>
                      {userType !== 'USER' && userType !== 'SUPERWISER' && (
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groups
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item) => (
                        <TableRow
                          key={item.id}
                          sx={{
                            '&:hover': {
                              border: '2px solid blue',
                            }
                          }}
                        >
                          <TableCell align="center">{item.id}</TableCell>
                          <TableCell align="center">{item.name}</TableCell>
                          <TableCell align="center">
                            {item.users.map((user, index) => (
                              <div key={index}>
                                {user.name}
                              </div>
                            ))}
                          </TableCell>
                          {userType !== 'USER' && userType !== 'SUPERWISER' && (
                          <TableCell align="center">
                            <DeleteIcon onClick={() => handleDelete(item.id)} />
                          </TableCell>
                          )}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <CustomTablePagination
              count={groups.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Paper>
      </Grid>
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
    </Grid>
  );
}

export default GroupsList;
