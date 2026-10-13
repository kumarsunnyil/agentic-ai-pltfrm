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

import { useEffect, useState } from "react";
import { List } from "@mui/material";

import SidebarItem from "./SidebarItem";
import { navigation } from "@/config/navigation";

export default function SidebarNavigation() {
  const [userRoles, setUserRoles] = useState<string[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCurrentUser() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          console.error(
            "Sidebar: Failed to load current user",
            response.status,
          );
          setUserRoles([]);
          return;
        }

        const data: unknown = await response.json();

        if (
          typeof data === "object" &&
          data !== null &&
          "roles" in data &&
          Array.isArray(data.roles) &&
          data.roles.every((role): role is string => typeof role === "string")
        ) {
          setUserRoles(data.roles);
          console.info("Sidebar: Loaded roles", data.roles);
        } else {
          console.error("Sidebar: Invalid /api/auth/me response");
          setUserRoles([]);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Sidebar: Session request failed", error);
          setUserRoles([]);
        }
      }
    }

    void loadCurrentUser();

    return () => controller.abort();
  }, []);

  const visibleNavigation = navigation.filter((item) => {
    if (!item.requiredRoles) {
      return true;
    }

    if (userRoles === null) {
      return false;
    }

    return item.requiredRoles.some((role) => userRoles.includes(role));
  });

  return (
    <List
      disablePadding
      sx={{
        px: { xs: 2, md: 1, lg: 2 },
        py: 1,
        width: "100%",
      }}
    >
      {visibleNavigation.map((item) => (
        <SidebarItem key={item.id} item={item} />
      ))}
    </List>
  );
}
