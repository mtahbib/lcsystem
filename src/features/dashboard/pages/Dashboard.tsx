import StatCard from "@/components/common/StatCard";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";

import { FileStack, FileText, Receipt } from "lucide-react";

import { useLCRecords } from "@/features/lc/store/lcStore";
import { useShipmentRecords } from "@/features/lc/store/shipmentStore";
import { useProformaInvoices } from "@/features/proforma/store/proformaStore";

export default function Dashboard() {
  const lcRecords = useLCRecords();
  const shipmentRecords = useShipmentRecords();
  const proformaRecords = useProformaInvoices();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the LC Document Management System.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Total LCs" value={lcRecords.length} icon={FileText} />
        <StatCard
          title="Document Sets Generated"
          value={shipmentRecords.length}
          icon={FileStack}
        />
        <StatCard
          title="Proforma Invoices"
          value={proformaRecords.length}
          icon={Receipt}
        />
      </div>

      <QuickActions />

      <RecentActivity />
    </div>
  );
}
