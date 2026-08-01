import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import { NavigationItem } from "@/types/navigation";

export const navigation: NavigationItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    icon: DashboardRoundedIcon,
  },
  {
    id: "chat",
    title: "AI Workspace",
    href: "/chat",
    icon: SmartToyRoundedIcon,
  },
  {
    id: "knowledge",
    title: "Knowledge Hub",
    href: "/knowledge",
    icon: AutoAwesomeRoundedIcon,
  },
  {
    id: "documents",
    title: "Documents",
    href: "/documents",
    icon: DescriptionRoundedIcon,
  },
  {
    id: "agents",
    title: "AI Agents",
    href: "/agents",
    icon: HubRoundedIcon,
  },
  {
    id: "workflow",
    title: "Workflow Studio",
    href: "/workflow",
    icon: AccountTreeRoundedIcon,
  },
  {
    id: "analytics",
    title: "Analytics",
    href: "/analytics",
    icon: InsightsRoundedIcon,
  },
  {
    id: "administration",
    title: "Administration",
    href: "/administration",
    icon: AdminPanelSettingsRoundedIcon,
  },
  {
    id: "settings",
    title: "Settings",
    href: "/settings",
    icon: SettingsRoundedIcon,
  },
];