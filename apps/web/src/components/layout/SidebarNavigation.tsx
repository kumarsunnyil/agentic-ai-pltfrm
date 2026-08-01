"use client";

import { List } from "@mui/material";

import SidebarItem from "./SidebarItem";

import { navigation } from "@/config/navigation";

export default function SidebarNavigation() {
  return (
    <List
      sx={{
        px: 2,
        py: 1,
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