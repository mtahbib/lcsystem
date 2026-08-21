import { FileStack, FileText, Receipt } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useLCRecords } from "@/features/lc/store/lcStore";
import { useShipmentRecords } from "@/features/lc/store/shipmentStore";
import { useProformaInvoices } from "@/features/proforma/store/proformaStore";
import { firstLine } from "@/features/lc/utils";

interface ActivityItem {
  id: string;
  icon: LucideIcon;
  text: string;
  createdAt: string;
}

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function RecentActivity() {
  const lcRecords = useLCRecords();
  const shipmentRecords = useShipmentRecords();
  const proformaRecords = useProformaInvoices();

  const items: ActivityItem[] = [
    ...lcRecords.map((r) => ({
      id: `lc-${r.id}`,
      icon: FileText as LucideIcon,
      text: `LC ${r.lc.lcNumber} created for ${firstLine(r.customer.details)}`,
      createdAt: r.createdAt,
    })),
    ...shipmentRecords.map((r) => ({
      id: `shipment-${r.id}`,
      icon: FileStack as LucideIcon,
      text: "Document set generated",
      createdAt: r.createdAt,
    })),
    ...proformaRecords.map((r) => ({
      id: `proforma-${r.id}`,
      icon: Receipt as LucideIcon,
      text: `Proforma invoice ${r.invoiceNo} created for ${r.importerName}`,
      createdAt: r.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nothing yet — create an LC or a Proforma Invoice to see activity here.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map(({ id, icon: Icon, text, createdAt }) => (
            <div key={id} className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-slate-100 p-2">
                <Icon className="size-4 text-slate-600" />
              </div>
              <div>
                <p className="text-sm">{text}</p>
                <p className="text-xs text-muted-foreground">{timeAgo(createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
