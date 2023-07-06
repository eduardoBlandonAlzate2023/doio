import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      red: "#d01345",
      gray: "#2d2d2d",
      lightGray: "#3d3d3d",
      white: "#fff",
      black: "#2d2d2d",
      main: "#2d2d2d",
    },
  },
  typography: {
    large: "1.5rem",
    medium: "1rem",
    small: "0.75rem",
  },
});

export default theme;
