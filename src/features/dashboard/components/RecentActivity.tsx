import { FileText, Ship, UserPlus } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: FileText,
    text: "LC-2026-014 was created for Al Amin Traders",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: Ship,
    text: "Shipment SH-1042 marked as dispatched",
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: UserPlus,
    text: "New customer Bengal Imports Ltd. added",
    time: "1 day ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>

      <div className="space-y-4">
        {activities.map(({ id, icon: Icon, text, time }) => (
          <div key={id} className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-slate-100 p-2">
              <Icon className="size-4 text-slate-600" />
            </div>
            <div>
              <p className="text-sm">{text}</p>
              <p className="text-xs text-muted-foreground">{time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
