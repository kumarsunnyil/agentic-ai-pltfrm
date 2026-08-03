import { SvgIconComponent } from "@mui/icons-material";

export interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: SvgIconComponent;
  color: string;
}