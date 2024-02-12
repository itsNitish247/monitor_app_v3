import React from "react";
import { Grid, Select, MenuItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";

function CustomPagination({
  selectedPage,
  setSelectedPage,
  objects,
  noOfRows,
  setNoOfRows,
}) {
  const handleChangePage = (event, value) => {
    setSelectedPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setNoOfRows(parseInt(event.target.value, 10));
    setSelectedPage(1);
  };

  const visibleObjects = objects.slice(0, 10); // Display only first 10 rows
  const noPages = Math.ceil(visibleObjects.length / noOfRows);

  return (
    <>
      {noPages <= 0 ? (
        <></>
      ) : (
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={8}>
            <Pagination
              count={noPages}
              page={selectedPage}
              onChange={handleChangePage}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              value={noOfRows}
              onChange={handleChangeRowsPerPage}
              variant="outlined"
              fullWidth
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default CustomPagination;
