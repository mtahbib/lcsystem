import { Users } from "lucide-react";

export default function Customers() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="mt-2 text-muted-foreground">
          A dedicated customer directory is coming soon.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-white py-16 text-center">
        <div className="rounded-full bg-slate-100 p-3">
          <Users className="size-6 text-slate-500" />
        </div>
        <p className="font-medium">Coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Customer details are currently entered per LC in the Create LC form.
        </p>
      </div>
    </div>
  );
}
