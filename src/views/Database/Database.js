import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";

function Database(props) {
  const history = useNavigate();
  const item = props.item;

  const handleOnClickDatabase = (database) => {
    history.push("/database-detail", database);
  };

  return (
    <TableRow key={item.id}>
      <TableCell>{item.id}</TableCell>
      <TableCell onClick={() => handleOnClickDatabase(item)}>
        <NavLink to={"/database-detail/" + item.id} name="update database">
          {item.name}
        </NavLink>
      </TableCell>
      <TableCell>{item.host}:{item.port}</TableCell>
      <TableCell>
        <NavLink to={"/database-status/" + item.id} name="Database Status">
          <Button color="info" variant="outline" shape="rounded-pill">
            <Icon>task</Icon>
          </Button>
        </NavLink>
      </TableCell>
    </TableRow>
  );
}

export default Database;
