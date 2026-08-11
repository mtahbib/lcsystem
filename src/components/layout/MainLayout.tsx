import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import TopNav from "@/components/layout/TopNav";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100 print:block print:min-h-0 print:bg-white">
      <div className="print:hidden">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col print:block">
        <div className="print:hidden">
          <TopNav />
        </div>

        <main className="flex-1 overflow-y-auto p-6 print:overflow-visible print:p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
