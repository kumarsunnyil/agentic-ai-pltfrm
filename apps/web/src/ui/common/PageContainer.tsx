/**
 * ------------------------------------------------------------
 * @file: src\ui\common\PageContainer.tsx
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */


"use client";

import { Box } from "@mui/material";

import dashboardTheme from "@/theme/dashboard";

interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        maxWidth: dashboardTheme.layout.maxWidth,
        mx: "auto",
        px: dashboardTheme.layout.pagePadding,
        py: dashboardTheme.layout.pagePadding,
      }}
    >
      {children}
    </Box>
  );
}