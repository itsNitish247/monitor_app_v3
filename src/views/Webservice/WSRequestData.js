import React, { useState } from "react";
import { 
  Grid,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { AddCircleOutline as AddIcon, RemoveCircleOutline as RemoveIcon } from "@mui/icons-material";

function WSRequestData({
  id,
  requestData,
  isLastIndex,
  addRequestData,
  setRequestData,
  removeRequestData,
}) {
  const [name, setName] = useState(requestData.name);
  const [description, setDescription] = useState(requestData.description);
  const [value, setValue] = useState(requestData.value);

  const setParamName = (e) => {
    setName(e.target.value);
    setRequestData(id, e.target.value, value, description);
  };

  const setParamValue = (e) => {
    setValue(e.target.value);
    setRequestData(id, name, e.target.value, description);
  };

  const setParamDescription = (e) => {
    setDescription(e.target.value);
    setRequestData(id, name, value, e.target.value);
  };

  const remove = () => {
    removeRequestData(id);
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={3}>
        <TextField
          fullWidth
          type="text"
          label="Name"
          required
          value={name}
          disabled={!requestData.isNewlyAdded}
          onChange={setParamName}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          type="text"
          required
          value={value}
          label="Value"
          onChange={setParamValue}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          multiline
          rows={2}
          value={description}
          label="Description"
          onChange={setParamDescription}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton color={isLastIndex ? "primary" : "secondary"} onClick={isLastIndex ? addRequestData : remove}>
          {isLastIndex ? <AddIcon /> : <RemoveIcon />}
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default WSRequestData;
