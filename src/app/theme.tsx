"use client";

import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, green, orange, purple, red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    menuGray: Palette["primary"];
  }

  interface PaletteOptions {
    menuGray?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    menuGray: {
      main: "#15141a",
      light: "#221f26",
    },
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
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
    },
  },
});

export default responsiveFontSizes(theme);
