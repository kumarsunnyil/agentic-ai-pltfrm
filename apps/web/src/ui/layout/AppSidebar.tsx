/**
 * ------------------------------------------------------------
 * @file: src/ui/layout/AppSidebar.tsx
 * @description: Responsive Enterprise Application Sidebar.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import { Box, Divider, Drawer } from "@mui/material";

import Logo from "./Logo";
import SidebarNavigation from "./SidebarNavigation";
import StorageCard from "./StorageCard";
import VersionInfo from "./VersionInfo";

import {
  DRAWER_WIDTH,
  MINI_DRAWER_WIDTH,
} from "@/theme/constants";

interface AppSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function AppSidebar({
  mobileOpen = false,
  onMobileClose,
}: AppSidebarProps) {
  const sidebarContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "background.paper",
      }}
    >
      {/* Logo */}

      <Logo />

      <Divider />

      {/* Navigation */}

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",

          "&::-webkit-scrollbar": {
            width: 6,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "action.disabled",
            borderRadius: 3,
          },

          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        <SidebarNavigation />
      </Box>

      <Box
        sx={{
          flexShrink: 0,
        }}
      >
        <StorageCard />

        <Divider />

        <VersionInfo />
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          width: {
            md: MINI_DRAWER_WIDTH,
            lg: DRAWER_WIDTH,
          },

          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: {
              md: MINI_DRAWER_WIDTH,
              lg: DRAWER_WIDTH,
            },

            boxSizing: "border-box",

            borderRight: "1px solid",

            borderColor: "divider",

            backgroundColor: "background.paper",

            overflow: "hidden",

            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.standard,
              }),
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}