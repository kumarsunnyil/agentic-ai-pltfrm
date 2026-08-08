"use client";

import { Box } from "@mui/material";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import PageContainer from "./PageContainer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AppSidebar />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <AppHeader />

        <PageContainer>{children}</PageContainer>
      </Box>
    </Box>
  );
}