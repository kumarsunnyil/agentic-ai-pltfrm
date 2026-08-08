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
    <ListItem disablePadding sx={{ mb: 1 }}>
      <ListItemButton
        component={Link}
        href={item.href}
        selected={active}
        sx={{
          minHeight: 54,
          px: 2,
          borderRadius: 3,

          transition: "all .2s",

          "&:hover": {
            bgcolor: "primary.main",
            color: "primary.contrastText",
          },

          "&.Mui-selected": {
            bgcolor: "primary.main",
            color: "primary.contrastText",

            "& .MuiListItemIcon-root": {
              color: "primary.contrastText",
            },

            "&:hover": {
              bgcolor: "primary.dark",
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            color: active ? "primary.contrastText" : "text.secondary",
            minWidth: 22,
          }}
        >
          <Icon />
        </ListItemIcon>

        <ListItemText
          disableTypography
          primary={
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: active ? 600 : 500,
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