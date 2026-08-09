/**
 * ------------------------------------------------------------
 * @file: src/features/dashboard/components/KpiGrid.tsx
 * @description: Responsive enterprise dashboard KPI grid.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */
"use client";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

import { Grid } from "@mui/material";

import { KPI_DATA } from "../constants/dashboard.constants";

import KpiCard from "./KpiCard";

const KPI_ICONS = {
  agents: AutoAwesomeRoundedIcon,
  documents: DescriptionOutlinedIcon,
  chats: ChatBubbleOutlinedIcon,
  workflows: AccountTreeOutlinedIcon,
};

export default function KpiGrid() {
  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2.5, md: 3 }}
      sx={{ width: "100%" }}
    >
      {KPI_DATA.map((item) => {
        const Icon = KPI_ICONS[item.icon];

        return (
          <Grid
            key={item.id}
            size={{ xs: 12, sm: 6, lg: 3 }}
            sx={{ display: "flex", minWidth: 0 }}
          >
            <KpiCard
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
              icon={Icon}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}