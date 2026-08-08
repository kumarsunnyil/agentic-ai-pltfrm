/**
 * ------------------------------------------------------------
 * @file: src/ui/layout/SidebarNavigation.tsx
 * @description: Responsive Enterprise Sidebar navigation container.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import { List } from "@mui/material";

import SidebarItem from "./SidebarItem";

import { navigation } from "@/config/navigation";

export default function SidebarNavigation() {
  return (
    <List
      disablePadding
      sx={{
        px: {
          xs: 2,
          md: 1,
          lg: 2,
        },

        py: {
          xs: 1,
          md: 1,
          lg: 1,
        },

        width: "100%",
      }}
    >
      {navigation.map((item) => (
        <SidebarItem
          key={item.id}
          item={item}
        />
      ))}
    </List>
  );
}