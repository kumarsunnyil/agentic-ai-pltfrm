/**
 * ------------------------------------------------------------
 * @file: src/ui/layout/AppLayout.tsx
 * @description: Responsive Enterprise Application Layout.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import { Box } from "@mui/material";
import { useState } from "react";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import PageContainer from "./PageContainer";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const handleMobileSidebarOpen = () => {
    setMobileSidebarOpen(true);
  };

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "background.default",
        overflow: "hidden",
      }}
    >

      <AppSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Header */}

        <AppHeader
          onMenuClick={handleMobileSidebarOpen}
        />

        {/* Page Content */}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <PageContainer>
            {children}
          </PageContainer>
        </Box>
      </Box>
    </Box>
  );
}