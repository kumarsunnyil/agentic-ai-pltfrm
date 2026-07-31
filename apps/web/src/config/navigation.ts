import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: DashboardRoundedIcon,
  },
  {
    title: "AI Chat",
    href: "/chat",
    icon: SmartToyRoundedIcon,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: DescriptionRoundedIcon,
  },
  {
    title: "AI Agents",
    href: "/agents",
    icon: HubRoundedIcon,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: InsightsRoundedIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: SettingsRoundedIcon,
  },
] as const;