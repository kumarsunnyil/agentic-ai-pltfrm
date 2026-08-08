/**
 * ------------------------------------------------------------
 * @file: src\features\dashboard\constants\dashboard.constants.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 08-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */


import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

export const KPI_DATA = [
  {
    id: 1,
    title: "AI Agents",
    value: 24,
    subtitle: "Active agents",
    icon: AutoAwesomeRoundedIcon,
  },
  {
    id: 2,
    title: "Documents",
    value: 1248,
    subtitle: "Knowledge documents",
    icon: DescriptionOutlinedIcon,
  },
  {
    id: 3,
    title: "AI Chats",
    value: 386,
    subtitle: "Conversations",
    icon: ChatBubbleOutlinedIcon,
  },
  {
    id: 4,
    title: "Workflows",
    value: 16,
    subtitle: "Active workflows",
    icon: AccountTreeOutlinedIcon,
  },
];