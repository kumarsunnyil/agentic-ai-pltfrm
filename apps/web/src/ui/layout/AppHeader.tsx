/**
 * ------------------------------------------------------------
 * @file: src/ui/layout/AppHeader.tsx
 * @description: Responsive Enterprise Application Header.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
} from "@mui/material";

import AppBreadcrumbs from "./Breadcrumbs";
import NotificationMenu from "./NotificationMenu";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import UserMenu from "./UserMenu";

import { HEADER_HEIGHT } from "@/theme/constants";

interface AppHeaderProps {
  onMenuClick?: () => void;
}

export default function AppHeader({
  onMenuClick,
}: AppHeaderProps) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.default",
      }}
    >
      <Toolbar
        sx={{
          minHeight: HEADER_HEIGHT,
          height: HEADER_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: 0,
            flex: 1,
            gap: {
              xs: 1,
              md: 2,
            },
          }}
        >
          <IconButton
            aria-label="Open navigation menu"
            onClick={onMenuClick}
            sx={{
              display: {
                xs: "inline-flex",
                md: "none",
              },
              flexShrink: 0,
              borderRadius: 2,
              color: "text.primary",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <MenuOutlinedIcon />
          </IconButton>

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <AppBreadcrumbs />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: {
              xs: 0.5,
              sm: 1,
              md: 1.5,
            },
            flexShrink: 0,
          }}
        >

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              width: {
                sm: 260,
                md: 360,
                lg: 460,
              },
              maxWidth: "40vw",
            }}
          >
            <SearchBar />
          </Box>
          <NotificationMenu />
          <ThemeSwitcher />
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}