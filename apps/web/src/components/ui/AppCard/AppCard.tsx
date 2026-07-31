"use client";

import { Card, CardProps } from "@mui/material";

export default function AppCard({
  children,
  sx,
  ...props
}: CardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        p: 3,
        backgroundColor: "background.paper",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
}