import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Parameter({id, parameter, isLastIndex, addParameter, setParameter, removeParameter }) {
  const [key, setKey] = useState(parameter.key);
  const [value, setValue] = useState(parameter.value);

  const setParamKey = (e) => {
    setKey(e.target.value)
    setParameter(id, e.target.value, value)
  }

  const setParamValue = (e) => {
    setValue(e.target.value)
    setParameter(id, key, e.target.value)
  }

  const remove = () => {
    removeParameter(id)
  }

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={3}>
        <TextField
          fullWidth
          type="text"
          label="Key"
          required
          value={key}
          onChange={setParamKey}
        />
    </Grid>
    
      <Grid item xs={1}></Grid>
      <Grid item xs={3}>
        <TextField
          fullWidth
          type="text"
          label="Value"
          required
          value={value}
          onChange={setParamValue}
        />
     
      </Grid>
      <Grid item xs={1}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            {
              isLastIndex ? 
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={addParameter}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              :
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={remove}
                  startIcon={<RemoveIcon />}
                >
                  Remove
                </Button>
            }            
          </Grid>          
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Parameter;
