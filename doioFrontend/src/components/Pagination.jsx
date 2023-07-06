import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { setPageNumber } from "../store";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Pagination() {
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.state.pageNumber);
  const nextPage = useSelector((state) => state.state.nextPage);
  const theme = useTheme();

  const handlePreviousPage = () => {
    dispatch(setPageNumber(pageNumber - 1));
  };

  const handleNextPage = () => {
    dispatch(setPageNumber(pageNumber + 1));
  };

  return (
    <Box
      sx={{
        textAlign: "left",
        "& *": {
          margin: "10vh 10vw",
          fontSize: theme.typography.large,
          color: theme.palette.primary.black
        },
      }}
    >
      <Button disabled={pageNumber === 1} onClick={handlePreviousPage}>
        Previous
      </Button>
      <Button onClick={handleNextPage} disabled={!nextPage}>
        Next
      </Button>
    </Box>
  );
}

export default Pagination;
