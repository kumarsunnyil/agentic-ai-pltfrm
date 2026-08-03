import { Stack } from "@mui/material";

import DashboardHeader from "./components/DashboardHeader";
import WelcomeBanner from "./components/WelcomeBanner";

export default function Dashboard() {
  return (
    <Stack spacing={4}>
      <DashboardHeader />

      <WelcomeBanner />
    </Stack>
  );
}