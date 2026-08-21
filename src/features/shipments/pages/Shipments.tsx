import { Ship } from "lucide-react";

export default function Shipments() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Shipments</h1>
        <p className="mt-2 text-muted-foreground">
          A dedicated shipments overview is coming soon.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-white py-16 text-center">
        <div className="rounded-full bg-slate-100 p-3">
          <Ship className="size-6 text-slate-500" />
        </div>
        <p className="font-medium">Coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Shipments are currently created and managed from the Master Form under
          each LC in the LC Repository.
        </p>
      </div>
    </div>
  );
}
