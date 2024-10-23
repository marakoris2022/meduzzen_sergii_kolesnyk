"use client";

import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, green, orange, purple, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[500],
    },
    secondary: {
      main: purple[500],
    },
    success: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
    warning: {
      main: orange[500],
    },
  },
});

export default responsiveFontSizes(theme);
