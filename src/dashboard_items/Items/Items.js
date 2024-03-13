// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   Grid,
//   LinearProgress,
//   Paper,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import FlipClock from "../Dashboard_Clock/Clock";
// import { getServers } from "../../api/server-service";
// import { getDatabaseRequest } from "../../api/database-service";
// import { listWSRequests } from "../../api/ws-request-service";
// import { useNavigate } from "react-router-dom";
// import WaveGraph from "../charts/wave";

// function Items() {
//   const navigate = useNavigate();
//   const [serverCount, setServerCount] = useState(0);
//   const [databaseCount, setDatabaseCount] = useState(0);
//   const [webserviceCount, setWebserviceCount] = useState(0);
//   const [activeCount, setActiveCount] = useState(0); // State for active server count
//   const [inactiveCount, setInactiveCount] = useState(0);
//   const MAX_SERVERS = 20;
//   const MAX_DATABASES = 20;
//   const MAX_WEBSERVICES = 20;
//   useEffect(() => {
//     fetchServers();
//     fetchDatabases();
//     fetchWebService();
//   }, []);

//   //   const fetchServers = () => {
//   // getServers()
//   //       .then((response) => {
//   //         console.log("Server data:", response.data);
//   //        setServerCount(response.data.length);
//   //           console.log("Server data:", response.data.length);
//   //        })
//   //    .catch((error) => {
//   //       });
//   //   };
//   const fetchServers = () => {
//     getServers()
//       .then((response) => {
//         console.log("Server data:", response.data);

//         // Filter active servers
//         const activeServers = response.data.filter((server) => server.isActive);
//         // Filter inactive servers
//         const inactiveServers = response.data.filter(
//           (server) => !server.isActive
//         );

//         // Set the counts for active and inactive servers
//         setActiveCount(activeServers.length);
//         setInactiveCount(inactiveServers.length);

//         // Total server count remains unchanged
//         setServerCount(response.data.length);

//         console.log("Active servers:", activeServers);
//         console.log("Inactive servers:", inactiveServers);
//       })
//       .catch((error) => {
//         console.error("Error fetching servers:", error);
//       });
//   };

//   const fetchDatabases = () => {
//     getDatabaseRequest()
//       .then((response) => {
//         console.log("Database data:", response.data);
//         setDatabaseCount(response.data.length);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const fetchWebService = () => {
//     listWSRequests()
//       .then((response) => {
//         setWebserviceCount(response.data.length);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const progressValue = (serverCount / MAX_SERVERS) * 100;
//   const progressValueDatabase = (databaseCount / MAX_DATABASES) * 100;
//   const progressValueWebservice = (webserviceCount / MAX_WEBSERVICES) * 100;
//   return (
//     <>
//       <Grid item xs={8}>
//         <Card elevation={0}>
//           <CardHeader title="Total Services Monitored" />
//           <CardContent>
//             <Grid container spacing={2}>
//               <Grid item xs={4}>
//                 <Paper elevation={10}>
//                   <Card>
//                     <CardContent>
//                       <Typography
//                         sx={{ fontSize: 10 }}
//                         color="text.secondary"
//                         gutterBottom
//                       >
//                         Servers
//                       </Typography>
//                       {/* <Typography variant="h5">
//       Total Servers: {serverCount}
//     </Typography> */}

//                       <WaveGraph
//                         activeCount={activeCount}
//                         inactiveCount={inactiveCount}
//                       />
//                     </CardContent>
//                     <CardActions>
//                       <Button
//                         onClick={() => navigate("/server-list")}
//                         sx={{
//                           bgcolor: "#5e35b1",
//                           color: "white",
//                           ml: 1,
//                           "&:hover": {
//                             bgcolor: "#c5b4e3",
//                           },
//                         }}
//                         size="small"
//                       >
//                         View Servers
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Paper>
//               </Grid>

//               <Grid item xs={4}>
//                 <Paper elevation={10}>
//                   <Card>
//                     <CardContent>
//                       <Typography
//                         sx={{ fontSize: 10 }}
//                         color="text.secondary"
//                         gutterBottom
//                       >
//                         Databases
//                       </Typography>
//                       <Typography variant="h5">
//                         Total databases:{databaseCount}
//                       </Typography>
//                       <LinearProgress
//                         variant="determinate"
//                         value={progressValueDatabase}
//                         sx={{
//                           marginTop: 1,
//                           "& .MuiLinearProgress-bar": {
//                             backgroundColor: "#00c853",
//                           },
//                           backgroundColor: "#b9f6ca",
//                         }}
//                       />
//                     </CardContent>
//                     <CardActions>
//                       <Button
//                         onClick={() => navigate("/database-list")}
//                         sx={{
//                           bgcolor: "#00c853",
//                           color: "white",
//                           ml: 1,
//                           "&:hover": {
//                             bgcolor: "#b9f6ca",
//                           },
//                         }}
//                         size="small"
//                       >
//                         View Databases
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Paper>
//               </Grid>
//               <Grid item xs={4}>
//                 <Paper elevation={10}>
//                   <Card>
//                     <CardContent>
//                       <Typography
//                         sx={{ fontSize: 10 }}
//                         color="text.secondary"
//                         gutterBottom
//                       >
//                         Webservices
//                       </Typography>
//                       <Typography variant="h5">
//                         Total webservices: {webserviceCount}
//                       </Typography>
//                       <LinearProgress
//                         variant="determinate"
//                         value={progressValueWebservice}
//                         sx={{
//                           marginTop: 1,
//                           "& .MuiLinearProgress-bar": {
//                             backgroundColor: "#1e88e5",
//                           },
//                           backgroundColor: "#aad7fa",
//                         }}
//                       />
//                     </CardContent>
//                     <CardActions>
//                       <Button
//                         onClick={() => navigate("/webservice-list")}
//                         sx={{
//                           bgcolor: "#1e88e5",
//                           color: "white",
//                           ml: 1,
//                           "&:hover": {
//                             bgcolor: "#aad7fa",
//                           },
//                         }}
//                         size="small"
//                       >
//                         View Api's
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Grid>
//       <Grid item xs={4}>
//         <FlipClock />
//       </Grid>
//     </>
//   );
// }

// export default Items;


import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlipClock from "../Dashboard_Clock/Clock";
import { getServers } from "../../api/server-service";
import { getDatabaseRequest } from "../../api/database-service";
import { listWSRequests } from "../../api/ws-request-service";
import { useNavigate } from "react-router-dom";
import ArrowUpwardIcon  from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon  from "@mui/icons-material/ArrowDownward"

import SemiDonutGraphForDatabase from "../charts/semi-donut-for-Database";
import SemiDonutGraphForWebservice from "../charts/semi-donut-for-Webservice";
import SemiDonutGraphForServers from "../charts/semi-donut-for-servers";

function Items() {
  const navigate = useNavigate();
  const [serverCount, setServerCount] = useState(0);
  const [databaseCount, setDatabaseCount] = useState(0);
  const [webserviceCount, setWebserviceCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0); // State for active server count
  const [inactiveCount, setInactiveCount] = useState(0);

  const [activeDatabaseCount, setActiveDatabaseCount] = useState(0); // State for active server count
  const [inactiveDatabaseCount, setInactiveDatabaseCount] = useState(0);

  const [activeWebserviceCount, setActiveWebserviceCount] = useState(0); // State for active server count
  const [inactiveWebserviceCount, setInactiveWebserviceCount] = useState(0);
 
  useEffect(() => {
    fetchServers();
    fetchDatabases();
    fetchWebService();
  }, []);

  //   const fetchServers = () => {
  // getServers()
  //       .then((response) => {
  //         console.log("Server data:", response.data);
  //        setServerCount(response.data.length);
  //           console.log("Server data:", response.data.length);
  //        })
  //    .catch((error) => {
  //       });
  //   };
  const fetchServers = () => {
    getServers()
      .then((response) => {
        console.log("Server data:", response.data);

        // Filter active servers
        const activeServers = response.data.filter((server) => server.isActive);
        // Filter inactive servers
        const inactiveServers = response.data.filter(
          (server) => !server.isActive
        );

        // Set the counts for active and inactive servers
        setActiveCount(activeServers.length);
        setInactiveCount(inactiveServers.length);

        // Total server count remains unchanged
        setServerCount(response.data.length);

        console.log("Active servers:", activeServers);
        console.log("Inactive servers:", inactiveServers);
      })
      .catch((error) => {
        console.error("Error fetching servers:", error);
      });
  };

  const fetchDatabases = () => {
    getDatabaseRequest()
      .then((response) => {
        console.log("Database data:", response.data);
        const activeDatabase = response.data.filter((database) => database.isActive);
        // Filter inactive servers
        const inactiveDatabase = response.data.filter(
          (database) => !database.isActive
        );
        setActiveDatabaseCount(activeDatabase.length);
        setInactiveDatabaseCount(inactiveDatabase.length);

        // Total server count remains unchanged
        setDatabaseCount(response.data.length);

        console.log("Active servers:", activeDatabase);
        console.log("Inactive servers:", inactiveDatabase);
      })
      .catch((error) => {
        console.error("Error fetching servers:", error);
      });
  };


  const fetchWebService = () => {
    listWSRequests()
      .then((response) => {
        const activeWebservice = response.data.filter((webservice) => webservice.isActive);
        // Filter inactive servers
        const inactiveWebservice = response.data.filter(
          (webservice) => !webservice.isActive
        );

        // Set the counts for active and inactive servers
        setActiveWebserviceCount(activeWebservice.length);
        setInactiveWebserviceCount(inactiveWebservice.length);

        // Total server count remains unchanged
        setWebserviceCount(response.data.length);

        console.log("Active servers:", activeWebservice);
        console.log("Inactive servers:", inactiveWebservice);
      })
      .catch((error) => {
        console.error("Error fetching servers:", error);
      });
  };



  return (
    <>
      <Grid item xs={9}>
      
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper >
                  <Card>
                    <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
            Servers
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{fontSize : 15 }} > 
              {activeCount}
            </Typography>
            <ArrowUpwardIcon  sx= {{fontSize : 18 , mr:1}}  color="success" fontSize="10" />
            <Typography sx= {{fontSize : 15}} >
              {inactiveCount}
            </Typography>
            <ArrowDownwardIcon sx= {{fontSize : 18}}  color="error" fontSize="10"/>

          </Box>
        </Box>
  

                      <SemiDonutGraphForServers
                        activeCount={activeCount}
                        inactiveCount={inactiveCount}
                        totalCount={serverCount}
                        
                      />

                    </CardContent>
                    <CardActions>
                      {/* <Button
                        onClick={() => navigate("/server-list")}
                        sx={{
                          bgcolor: "#5e35b1",
                          color: "white",
                          ml: 1,
                          "&:hover": {
                            bgcolor: "#c5b4e3",
                          },
                        }}
                        size="small"
                      >
                        View Servers
                      </Button> */}
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>

              <Grid item xs={4}>
                <Paper >
                  <Card>
                    <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
            Databases
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{fontSize : 15 }} > 
              {activeDatabaseCount}
            </Typography>
            <ArrowUpwardIcon  sx= {{fontSize : 18 , mr:1}}  color="success" fontSize="10" />
            <Typography sx= {{fontSize : 15}} >
              {inactiveDatabaseCount}
            </Typography>
            <ArrowDownwardIcon sx= {{fontSize : 18}}  color="error" fontSize="10"/>

          </Box>
        </Box>
                      
                      <SemiDonutGraphForDatabase
                        activeDatabaseCount={activeDatabaseCount}
                        inactiveDatabaseCount={inactiveDatabaseCount}
                        totalDatabaseCount = {databaseCount}
                      />
                    </CardContent>
                    <CardActions>
                      {/* <Button
                        onClick={() => navigate("/database-list")}
                        sx={{
                          bgcolor: "#027148",
                          color: "white",
                          ml: 1,
                          "&:hover": {
                            bgcolor: "#b9f6ca",
                          },
                        }}
                        size="small"
                      >
                        View Databases
                      </Button> */}
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper>
                  <Card>
                    <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
            Webservices
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{fontSize : 15 }} > 
              {activeWebserviceCount}
            </Typography>
            <ArrowUpwardIcon  sx= {{fontSize : 18 , mr:1}}  color="success" fontSize="10" />
            <Typography sx= {{fontSize : 15}} >
              {inactiveWebserviceCount}
            </Typography>
            <ArrowDownwardIcon sx= {{fontSize : 18}}  color="error" fontSize="10"/>

          </Box>
        </Box>
                      <SemiDonutGraphForWebservice
                        activeWebserviceCount={activeWebserviceCount}
                        inactiveWebserviceCount={inactiveWebserviceCount}
                        totalWebserviceCount={webserviceCount}
                      />
                 
                    </CardContent>
                    <CardActions>
                  
                     
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>
            </Grid>
       
      </Grid>
      <Grid item xs={3}>
        <FlipClock />
      </Grid>
    </>
  );
}

export default Items;
