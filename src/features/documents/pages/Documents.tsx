import { FileStack } from "lucide-react";

export default function Documents() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="mt-2 text-muted-foreground">
          A cross-LC documents overview is coming soon.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-white py-16 text-center">
        <div className="rounded-full bg-slate-100 p-3">
          <FileStack className="size-6 text-slate-500" />
        </div>
        <p className="font-medium">Coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Generated documents are currently accessed per shipment from the LC
          Repository.
        </p>
      </div>
    </div>
  );
}
