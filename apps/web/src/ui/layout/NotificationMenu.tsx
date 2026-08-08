"use client";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { Badge, IconButton } from "@mui/material";

export default function NotificationMenu() {
  return (
    <IconButton>
      <Badge
        badgeContent={4}
        color="error"
      >
        <NotificationsNoneRoundedIcon />
      </Badge>
    </IconButton>
  );
}