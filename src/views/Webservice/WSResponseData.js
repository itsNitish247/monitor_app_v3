import React, { useState } from "react";
import { 
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import { AddCircleOutline as AddIcon, RemoveCircleOutline as RemoveIcon } from "@mui/icons-material";

function WSResponseData({ id, responseData, isLastIndex, addResponseData, setResponseData, removeResponseData }) {
    
  const [name, setName] = useState(responseData.name);
  const [value, setValue] = useState(responseData.value);

  const setParamName = (e) => {
    setName(e.target.value);
    setResponseData(id, e.target.value, value);
  };

  const setParamValue = (e) => {
    setValue(e.target.value);
    setResponseData(id, name, e.target.value);
  };

  const remove = () => {
    removeResponseData(id);
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={4}>
        <TextField
          fullWidth
          type="text"
          label="Name"
          required
          value={name}
          onChange={setParamName}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          type="text"
          required
          value={value}
          label="Value"
          onChange={setParamValue}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton color={isLastIndex ? "primary" : "secondary"} onClick={isLastIndex ? addResponseData : remove}>
          {isLastIndex ? <AddIcon /> : <RemoveIcon />}
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default WSResponseData;
