import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProformaInvoices } from "@/features/proforma/store/proformaStore";
import { useSettings } from "@/features/settings/store/settingsStore";
import ProformaInvoiceDocument from "@/features/proforma/templates/ProformaInvoiceDocument";
import PrintFitPage from "@/features/documents/components/PrintFitPage";

export default function ProformaView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const records = useProformaInvoices();
  const settings = useSettings();
  const record = records.find((r) => r.id === id);

  useEffect(() => {
    if (!record) return;
    const previousTitle = document.title;
    document.title = "proformainvoice";
    return () => {
      document.title = previousTitle;
    };
  }, [record]);

  if (!record) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Proforma invoice not found</h1>
        <Button variant="outline" onClick={() => navigate("/proforma")}>
          Back to Proforma Invoices
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-3xl font-bold">Proforma Invoice</h1>
          <p className="mt-2 text-muted-foreground">
            {record.invoiceNo} · {record.importerName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/proforma/${record.id}/edit`)}>
            <Pencil className="size-4" />
            Edit
          </Button>
          <Button onClick={() => window.print()}>
            <Printer className="size-4" />
            Print
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-slate-50 p-6 print:border-0 print:bg-white print:p-0">
        <PrintFitPage>
          <ProformaInvoiceDocument record={record} logo={settings.proformaLogo} />
        </PrintFitPage>
      </div>
    </div>
  );
}
