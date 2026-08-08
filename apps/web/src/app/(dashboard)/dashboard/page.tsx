import Typography from "@mui/material/Typography";

// export default function DashboardPage() {
//     // return (
//     //         Dashboard
//     //     </Typography>
//     // );
// }

import Dashboard from "@/features/dashboard/Dashboard";

export default function DashboardPage() {
    return (

        <Typography variant="h4">
            <Dashboard />
        </Typography>
    )
}