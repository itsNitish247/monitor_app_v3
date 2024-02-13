import React from "react";
import { 
  Button,
  CardContent,
  CardHeader,
  Grid,

  Typography,
  Snackbar,
  Paper,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import User from "./User";
import '../Server/Server_Styles/ServerList.scss'
import { listUsers } from "../../api/user-service";
import { Link as RouterLink } from "react-router-dom";
import "./UserList.scss"
import CustomPagination from "../../pagination/pagination";
function UserList() {
  const [users, setUsers] = React.useState([]);
  const [noOfRows, setNoOfRows] = React.useState(4);
  const [selectedPage, setSelectedPage] = React.useState(1);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const vertical = "top";
  const horizontal = "right";

  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    listUsers()
      .then((response) => {
        console.log(response);
        let users = response.data;
        users = users.filter((user) => user.id > 1);
        setUsers(users);
        if (users && users.length > 0) {
          showSnackbar("Successfully fetched all Users..");
        } else {
          console.log("No data found ");
        }
      })
      .catch((error) => {
        console.log(error);
        showSnackbar(error.message);
      });
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
      
<Paper elevation={10}>
          <CardHeader
          title="User List"
            action={
              <Button
                component={RouterLink}
                to="/user-detail"
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Add User
              </Button>
            }
          />
      
          <CardContent>
            <Typography variant="body2" className="text-medium-emphasis small">
              List of all Registered users
            </Typography>
           {users && users.length > 0 ? (
  <div className="table-container"> 
    <table className="table">
      <thead>
        <tr>
          <th style={{ padding: "8px" }}>Sl No.</th>
          <th style={{ padding: "8px" }}>Name</th>
          <th style={{ padding: "8px" }}>Type</th>
          <th style={{ padding: "8px" }}>E-Mail</th>
          <th style={{ padding: "8px" }}>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {users
          .slice((selectedPage - 1) * noOfRows, selectedPage * noOfRows)
          .map((user, index) => (
            user.id ? <User key={user.id} user={user} index={index} /> : null
          ))}
      </tbody>
    </table>
  </div>
) : (
  <Typography variant="body1">No Users Added Yet...</Typography>
)}

            <CustomPagination
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
              objects={users}
              noOfRows={noOfRows}
              setNoOfRows={setNoOfRows}
            />
          </CardContent>
          </Paper>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Grid>
  );
}

export default UserList;
