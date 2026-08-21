import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FilePlus2, FileText, Receipt } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Button
          className="h-20 justify-start gap-3"
          render={<Link to="/lc/new" />}
          nativeButton={false}
        >
          <FilePlus2 />
          Create LC
        </Button>

        <Button
          variant="outline"
          className="h-20 justify-start gap-3"
          render={<Link to="/lc" />}
          nativeButton={false}
        >
          <FileText />
          View LC Repository
        </Button>

        <Button
          variant="outline"
          className="h-20 justify-start gap-3"
          render={<Link to="/proforma/new" />}
          nativeButton={false}
        >
          <Receipt />
          New Proforma Invoice
        </Button>
      </div>
    </div>
  );
}
