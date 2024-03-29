// import React, { useEffect, useState } from "react";

//   import {
//     Button,
//     Paper,
//     CardContent,
//     CardHeader,
//     Grid,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Skeleton,
//     Snackbar,
//     Alert
//   } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";


// import { listWSRequests } from "../../api/ws-request-service";
// import { Add as AddIcon , Refresh as RefreshIcon } from "@mui/icons-material";
// import CustomTablePagination from "../../pagination/pagination";
// import DeleteIcon from '@mui/icons-material/Delete';


// const WebServiceList = () => {

//   const [webServiceRequests, setWebServiceRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [page, setPage] = useState(0);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");


//   useEffect(() => {
//     getWebServiceRequests();
//   }, []);

//   const handleRefresh = () => {
//     setLoading(true);
//     getWebServiceRequests();
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   const getWebServiceRequests = () => {
//     listWSRequests()
//       .then((response) => {
//         console.log(response.data);
//         setTimeout(() => {
//         setWebServiceRequests(response.data);
//         setLoading(false);
//         if (response.data.length > 0) {
//           showSnackbar("Successfully fetched all Web Services..", "success");
//         } 
//         },2000);

//       })
//       .catch((error) => {
//         console.log(error);
//         showSnackbar("Error fetching servers: " + error.message, "error");
//       });
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
//             title="Web Service List"
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
//                 to="/webservice-detail"
//                 variant="contained"
//                 color="primary"
//                 startIcon={<AddIcon />}
//                 sx={{marginLeft : 2}}
//               >
//                 Add Api
//               </Button>
//               </>
            
//             }
//           />
       
//           <CardContent>
//             <Typography variant="body2" color="textSecondary" component="p">
//               List of all web services available.
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
//               ) : webServiceRequests.length === 0 ? (
//   <Typography variant="body3" className="text-secondary">
//     No Webservices Added Yet...
//   </Typography>
//             ) : (
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Url</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Http Method</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Http Method</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {webServiceRequests
//                       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                       .map((item) => (
//                         <TableRow key={item.id}>
//                           <TableCell align="center">{item.id}</TableCell>
//                           <TableCell align="center">{item.name}</TableCell>
//                           <TableCell align="center">{item.url}</TableCell>
//                           <TableCell align="center">{item.httpMethod}</TableCell>
//                           <TableCell align="center"><DeleteIcon /></TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             )}
//             <CustomTablePagination
//               count={webServiceRequests.length}
//               page={page}
//               rowsPerPage={rowsPerPage}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </CardContent>
//           </Paper>
//       </Grid>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={5000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         >

//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Grid>
//   );
// };

// export default WebServiceList;
import React, { useEffect, useState } from "react";
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
import { Link as RouterLink } from "react-router-dom";
import { listWSRequests } from "../../api/ws-request-service";
import { Add as AddIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomTablePagination from "../../pagination/pagination";
import { useAppStore } from "../../appStore";

const WebServiceList = () => {

  const [webServiceRequests, setWebServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const userType = useAppStore(state => state.userType);

  useEffect(() => {
    getWebServiceRequests();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    getWebServiceRequests();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const getWebServiceRequests = () => {
    listWSRequests()
      .then((response) => {
        console.log(response.data);
        setTimeout(() => {
          setWebServiceRequests(response.data);
          setLoading(false);
          if (response.data.length > 0) {
            showSnackbar("Successfully fetched all Web Services..", "success");
          }
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        showSnackbar("Error fetching servers: " + error.message, "error");
      });
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
    // Filter out the row with the given id
    setWebServiceRequests(webServiceRequests.filter(item => item.id !== id));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper elevation={10}>
          <CardHeader
            title="Web Service List"
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
                  to="/webservice-detail"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ marginLeft: 2 }}
                >
                  Add Api
                </Button>
                )}
              </>
            }
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              List of all web services available.
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
                         <Skeleton />                       </TableCell>
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
            ) : webServiceRequests.length === 0 ? (
              <Typography variant="body3" className="text-secondary">
                No Webservices Added Yet...
              </Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Url</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Http Method</TableCell>
                      {userType !== 'USER' && userType !== 'SUPERWISER' && (
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                       )} </TableRow>
                  </TableHead>
                  <TableBody>
                    {webServiceRequests
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell align="center">{item.id}</TableCell>
                          <TableCell align="center">{item.name}</TableCell>
                          <TableCell align="center">{item.url}</TableCell>
                          <TableCell align="center">{item.httpMethod}</TableCell>
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
              count={webServiceRequests.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Paper>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default WebServiceList;
