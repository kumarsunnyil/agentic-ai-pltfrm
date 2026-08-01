"use client";

import { Box, Divider, Drawer } from "@mui/material";

import Logo from "./Logo";
import SidebarNavigation from "./SidebarNavigation";
import StorageCard from "./StorageCard";
import VersionInfo from "./VersionInfo";

import { DRAWER_WIDTH } from "@/theme/constants";

export default function AppSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          borderRight: "1px solid",
          borderColor: "divider",
          boxSizing: "border-box",
          bgcolor: "background.paper",
        },
      }}
    >
      <Logo />

      <Divider />

      <SidebarNavigation />

      <Box sx={{ flexGrow: 1 }} />

      <StorageCard />

      <Divider />

      <VersionInfo />
    </Drawer>
  );
}