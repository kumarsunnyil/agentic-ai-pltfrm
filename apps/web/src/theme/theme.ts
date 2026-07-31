"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,

  palette: {
    mode: "dark",

    primary: {
      main: "#3B82F6",
    },

    secondary: {
      main: "#8B5CF6",
    },

    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: "Roboto, sans-serif",

    button: {
      textTransform: "none",
    },
  },
});

export default theme;