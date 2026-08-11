import StatCard from "@/components/common/StatCard";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";

import {
  Clock,
  FileCheck2,
  FileText,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the LC Document Management System.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Total LCs" value={0} icon={FileText} />
        <StatCard title="Pending Documents" value={0} icon={Clock} />
        <StatCard title="Recently Generated Documents" value={0} icon={FileCheck2} />
      </div>

      <QuickActions />

      <RecentActivity />
    </div>
  );
}