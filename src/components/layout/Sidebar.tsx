import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus2,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
  disabled?: boolean;
}[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/lc/new", label: "Create LC", icon: FilePlus2 },
  { to: "/lc", label: "LC Repository", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-900 text-white md:flex">
      <div className="flex h-16 items-center px-6">
        <span className="text-lg font-bold tracking-tight">
          LC Document System
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {navItems.map(({ to, label, icon: Icon, end, disabled }) =>
          disabled ? (
            <span
              key={to}
              title="Coming soon"
              className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600"
            >
              <Icon className="size-4" />
              {label}
            </span>
          ) : (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white",
                  isActive && "bg-slate-800 text-white"
                )
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
}
