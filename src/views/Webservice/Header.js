import React, { useState } from "react";
import { 
  TextField,
  Button,
  Grid
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function Header({id, header, isLastIndex, addHeader, setHeader, removeHeader }) {
    
  const [key, setKey] = useState(header.key);
  const [value, setValue] = useState(header.value);

  const setParamKey = (e) => {
    setKey(e.target.value)
    setHeader(id, e.target.value, value)
  }

  const setParamValue = (e) => {
    setValue(e.target.value)
    setHeader(id, key, e.target.value)
  }

  const remove = () => {
    removeHeader(id)
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
      <Grid item xs={1}>

      </Grid>
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
          <Grid item xs={4}>
            {
              isLastIndex ? 
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={addHeader}
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

export default Header;
