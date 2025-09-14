import DashboardClient from "./dashboard-client";
import { AppHeader } from "@/components/app-header";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="pt-24 p-4 md:p-8">
        <DashboardClient />
      </main>
    </div>
  );
}
