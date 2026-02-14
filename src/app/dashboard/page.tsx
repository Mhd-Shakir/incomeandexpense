import { DashboardView } from "@/components/dashboard-view"
import ProtectedLayout from "@/components/protected-layout"

export default function DashboardPage() {
    return (
        <ProtectedLayout>
            <DashboardView />
        </ProtectedLayout>
    )
}
