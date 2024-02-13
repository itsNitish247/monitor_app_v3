import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";

function WebService(props) {
  const navigate = useNavigate();

  const handleOnClickWebService = () => {
    navigate("/ws-request-detail/" + props.item.id);
  };

  const { item, index } = props;

  return (
    <TableRow key={item.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell onClick={handleOnClickWebService}>
        <RouterLink to={"/ws-request-detail/" + item.id}>
          {item.name}
        </RouterLink>
      </TableCell>
      <TableCell>{item.url}</TableCell>
      <TableCell>{item.httpMethod}</TableCell>
      <TableCell>
        <RouterLink to={"/webservice-status/" + item.id}>
          <IconButton color="info" variant="outline" size="small">
            <TaskIcon />
          </IconButton>
        </RouterLink>
      </TableCell>
    </TableRow>
  );
}

export default WebService;
