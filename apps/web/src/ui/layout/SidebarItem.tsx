/**
 * ------------------------------------------------------------
 * @file: src/ui/layout/SidebarItem.tsx
 * @description: Reusable responsive Enterprise Sidebar navigation item.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { NavigationItem } from "@/types/navigation";

interface SidebarItemProps {
  item: NavigationItem;
}

export default function SidebarItem({
  item,
}: SidebarItemProps) {
  const pathname = usePathname();

  const active = pathname === item.href;

  const Icon = item.icon;

  return (
    <ListItem
      disablePadding
      sx={{
        mb: 1,
        width: "100%",
      }}
    >
      <ListItemButton
        component={Link}
        href={item.href}
        selected={active}
        aria-current={active ? "page" : undefined}
        title={item.title}
        sx={{
          minHeight: {
            xs: 52,
            md: 52,
            lg: 54,
          },

          px: {
            xs: 2,
            md: 1,
            lg: 2,
          },

          borderRadius: {
            xs: 2,
            md: 2,
            lg: 3,
          },

          justifyContent: {
            xs: "flex-start",
            md: "center",
            lg: "flex-start",
          },

          transition: "all 0.2s ease",

          color: active
            ? "primary.contrastText"
            : "text.secondary",

          "&:hover": {
            backgroundColor: active
              ? "primary.dark"
              : "action.hover",

            color: active
              ? "primary.contrastText"
              : "text.primary",
          },

          "&.Mui-selected": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",

            "& .MuiListItemIcon-root": {
              color: "primary.contrastText",
            },

            "& .MuiListItemText-primary": {
              color: "primary.contrastText",
            },

            "&:hover": {
              backgroundColor: "primary.dark",
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: {
              xs: 32,
              md: 0,
              lg: 32,
            },

            mr: {
              xs: 1,
              md: 0,
              lg: 1,
            },

            justifyContent: "center",

            color: active
              ? "primary.contrastText"
              : "text.secondary",

            transition: "color 0.2s ease",
          }}
        >
          <Icon
            sx={{
              fontSize: {
                xs: 22,
                md: 22,
                lg: 23,
              },
            }}
          />
        </ListItemIcon>

        <ListItemText
          disableTypography
          sx={{
            display: {
              xs: "block",
              md: "none",
              lg: "block",
            },

            minWidth: 0,

            transition: "opacity 0.2s ease",
          }}
          primary={
            <Typography
              noWrap
              sx={{
                fontSize: {
                  xs: 15,
                  lg: 16,
                },

                fontWeight: active ? 600 : 500,

                lineHeight: 1.4,

                color: "inherit",

                overflow: "hidden",

                textOverflow: "ellipsis",
              }}
            >
              {item.title}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}