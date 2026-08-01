import { SvgIconComponent } from "@mui/icons-material";

export interface NavigationItem {
  id: string;
  title: string;
 href: string;
  icon: SvgIconComponent;
  children?: NavigationItem[];
}