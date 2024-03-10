// import React , {useState , useEffect} from "react";
// import { 
//   Button,
//   CardContent,
//   CardHeader,
//   Grid,
//   Alert,
//   Typography,
//   Snackbar,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Skeleton,
// } from "@mui/material";
// import { Add as AddIcon , Refresh as RefreshIcon} from "@mui/icons-material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import { listUsers } from "../../api/user-service";
// import { Link as RouterLink } from "react-router-dom";
// import CustomTablePagination from "../../pagination/pagination";
// function UserList() {
//   const [users, setUsers] = useState([]);
//   const [noOfRows, setNoOfRows] = useState(4);
//   const [selectedPage, setSelectedPage] = useState(1);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   useEffect(() => {
//     getUsers();
//   }, []);
//   const getUsers = () => {
//     listUsers()
//       .then((response) => {
//         console.log("users data " ,response.data);
//        setTimeout(() => {
//         setUsers(response.data);
//         setLoading(false);
    
       
//         if (response.data.length > 0) {
//           showSnackbar("Successfully fetched all Users..", "success");
      
//         }
//         },2000);
//       })
//       .catch((error) => {
//         console.log(error);
//         showSnackbar("Error fetching users: " + error.message, "error");
//       });
//   };

//   const showSnackbar = (message , severity) => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   const handleRefresh = () => {
//     setLoading(true);
//     listUsers();
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
      
// <Paper elevation={10}>
//           <CardHeader
//           title="User List"
//             action={
//               <>
//                   <Button 
//                   variant="contained"
//                   color="secondary"
//                   startIcon={<RefreshIcon />}
//                   onClick={handleRefresh}
                  
//                 >
//                   Refresh
//                 </Button>
//                 <Button
//                 component={RouterLink}
//                 to="/user-detail"
//                 variant="contained"
//                 color="primary"
//                 startIcon={<AddIcon />}
//               sx={{marginLeft : 2}}
//               >
//                 Add User
//               </Button>
//               </> 
             
//             }
//           />
      
//           <CardContent>
//             <Typography variant="body2" className="text-medium-emphasis small">
//               List of all Registered users
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
//               ) : users.length === 0 ? (
//   <Typography variant="body3" className="text-secondary">
//     No Users Added Yet...
//   </Typography>
//               ) : (
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Type</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ph.No</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}></TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//         {users
//           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//           .map((item) => (
//             <TableRow key={item.id}>
//                           <TableCell align="center">{item.id}</TableCell>
//                           <TableCell align="center">{item.name}</TableCell>
//                           <TableCell align="center">{item.type}</TableCell>
//                           <TableCell align="center">{item.email}</TableCell>
//                           <TableCell align="center">{item.phoneNumber}</TableCell>
//                           <TableCell align="center"><DeleteIcon /></TableCell>
//                         </TableRow>
//           ))}
//           </TableBody>
//           </Table>
//           </TableContainer>
//               )}

//             <CustomTablePagination
//               count={users.length}
//               page={page}
//               rowsPerPage={rowsPerPage}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </CardContent>
//           </Paper>
//       </Grid>
//       <Snackbar
//         anchorOrigin={{ vertical:'top', horizontal:"right" }}
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         >
//       <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//         </Snackbar>
//     </Grid>
//   );
// }

// export default UserList;
import React, { useState, useEffect } from "react";
import {
  Button,
  CardContent,
  CardHeader,
  Grid,
  Alert,
  Typography,
  Snackbar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
} from "@mui/material";
import { Add as AddIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { listUsers, deleteUser } from "../../api/user-service";
import { Link as RouterLink } from "react-router-dom";
import CustomTablePagination from "../../pagination/pagination";
import { useAppStore } from "../../appStore";

function UserList() {
  const [users, setUsers] = useState([]);
  const [noOfRows, setNoOfRows] = useState(4);
  const [selectedPage, setSelectedPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const userType = useAppStore(state => state.userType);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    listUsers()
      .then((response) => {
        console.log("users data ", response.data);
        setTimeout(() => {
          setUsers(response.data);
          setLoading(false);

          if (response.data.length > 0) {
            showSnackbar("Successfully fetched all Users..", "success");

          }
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        showSnackbar("Error fetching users: " + error.message, "error");
      });
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleRefresh = () => {
    setLoading(true);
    getUsers();
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

  const handleDelete = (userId) => {
    deleteUser(userId)
      .then(() => {
        showSnackbar("User deleted successfully.", "success");
        getUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        showSnackbar("Error deleting user.", "error");
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>

        <Paper elevation={10}>
          <CardHeader
            title="User List"
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
                  to="/user-detail"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ marginLeft: 2 }}
                >
                  Add User
                </Button>
                )}
              </>
            }
          />

          <CardContent>
            <Typography variant="body2" className="text-medium-emphasis small">
              List of all Registered users
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
            ) : users.length === 0 ? (
              <Typography variant="body3" className="text-secondary">
                No Users Added Yet...
              </Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Type</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ph.No</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell align="center">{item.id}</TableCell>
                          <TableCell align="center">{item.name}</TableCell>
                          <TableCell align="center">{item.type}</TableCell>
                          <TableCell align="center">{item.email}</TableCell>
                          <TableCell align="center">{item.phoneNumber}</TableCell>
                          {userType !== 'USER' && userType !== 'SUPERWISER' && (
                          <TableCell align="center">
                            <DeleteIcon onClick={() => handleDelete(item.id)} />
                          </TableCell>
                       ) }
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <CustomTablePagination
              count={users.length}
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

export default UserList;
