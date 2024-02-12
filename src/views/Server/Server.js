import React from "react";
import { TableRow, TableCell, Button, IconButton } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

function Server({ item }) {
  const navigate = useNavigate();


  return (
    <TableRow key={item.id}>
      <TableCell component="th" scope="row">
        {item.id}
      </TableCell>
      <TableCell>
        <NavLink to={"/server-detail/" + item.id} name="update server">
          {item.name}
        </NavLink>
      </TableCell>
      <TableCell>{item.host}</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="info"
          shape="rounded-pill"
          onClick={() => navigate("/server-status/" + item.id)}
          name="Server Status"
        >
          <IconButton>
            <ArrowForward />
          </IconButton>
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default Server;
