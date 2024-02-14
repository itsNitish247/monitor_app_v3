import React from "react";
import { TablePagination } from "@mui/material";

function CustomTablePagination({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) {
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    const newPage = Math.floor(page * rowsPerPage / newRowsPerPage);
    onRowsPerPageChange(newRowsPerPage);
    onPageChange(newPage);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 15, 20]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

export default CustomTablePagination;
