"use client";

import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import theme from "@/theme/theme";

interface Props {
  children: React.ReactNode;
}

export default function ThemeProvider({
  children,
}: Props) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}