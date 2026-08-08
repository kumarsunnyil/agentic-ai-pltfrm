"use client";

import {
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";

import AppBreadcrumbs from "./Breadcrumbs";
import NotificationMenu from "./NotificationMenu";
import SearchBar from "./SearchBar"
import ThemeSwitcher from "./ThemeSwitcher";
import UserMenu from "./UserMenu";

import { HEADER_HEIGHT } from "@/theme/constants";

export default function AppHeader() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          minHeight: HEADER_HEIGHT,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AppBreadcrumbs />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SearchBar />

          <NotificationMenu />

          <ThemeSwitcher />

          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}