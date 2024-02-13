import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function User(props) {
  const navigate = useNavigate();
  
  const handleOnClickUser = (user) => {
    navigate("/user-detail", user);
  };

  const user = props.user; // Change 'item' to 'user'

  return (
    <TableRow key={user.id}>
      <TableCell component="th" scope="row">
        {props.index + 1}
      </TableCell>
      <TableCell onClick={() => handleOnClickUser(user)}>
        <NavLink to={"/user-detail/" + user.id} name="Update User">
          {user.name}
        </NavLink>
      </TableCell>
      <TableCell>{user.type}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
    </TableRow>
  );
}

export default User;
