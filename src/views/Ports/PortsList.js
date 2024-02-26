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
    import { Add as AddIcon , Refresh as RefreshIcon } from "@mui/icons-material";
    import { Link as RouterLink } from "react-router-dom";
    import { getPorts } from "../../api/ports_service";
    import CustomTablePagination from "../../pagination/pagination";

    function PortList() {
    const [ports, setPorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {
        fetchServers();
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        fetchServers();
    };

    const fetchServers = () => {
        getPorts()
        .then((response) => {
            console.log("Server data:", response.data);
            setTimeout(() => {
            setPorts(response.data);
            setLoading(false);
            if (response.data.length > 0) {
                showSnackbar("Successfully fetched all Servers.", "success");
            }
            }, 1000);
        })
        .catch((error) => {
            console.log(error);
            showSnackbar("Error fetching servers: " + error.message, "error");
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

    return (
        <Grid container spacing={1}>
        <Grid item xs={12}>
            <Paper elevation={10}>
            <CardHeader
                title="Ports List"
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
                    <Button
                    component={RouterLink}
                    to="/ports-detail"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{ marginLeft: 2 }}
                    >
                    Add Ports
                    </Button>
                </>
                }
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                List of all Ports
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
                ) : ports.length === 0 ? (
                <Typography variant="body3" className="text-secondary">
                    No Ports Added Yet...
                </Typography>
                ) : (
                <TableContainer>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Sl No.</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Host</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ports</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ports
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
                            <TableCell align="center">{item.host}</TableCell>
                          
                            <TableCell align="center">
  {Array.isArray(item.ports) ? (
    item.ports.map((service, index) => (
      <div key={index}>
        {service.ports} - {service.serviceName}
      </div>
    ))
  ) : (
    <div>Invalid ports data</div>
  )}
</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                )}
                <CustomTablePagination
                count={ports.length}
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

    export default PortList;
