import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Printer, Files, FileStack } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLCRecords } from "@/features/lc/store/lcStore";
import { useShipmentRecords } from "@/features/lc/store/shipmentStore";
import { useSettings } from "@/features/settings/store/settingsStore";
import EditDocumentDataDialog from "@/features/documents/components/EditDocumentDataDialog";
import PrintFitPage from "@/features/documents/components/PrintFitPage";
import CommercialInvoice from "@/features/documents/templates/CommercialInvoice";
import PackingList from "@/features/documents/templates/PackingList";
import BeneficiaryCertificate from "@/features/documents/templates/BeneficiaryCertificate";
import ShippingAdvice, {
  type ShippingAdviceRecipient,
} from "@/features/documents/templates/ShippingAdvice";
import ExportCertificate from "@/features/documents/templates/ExportCertificate";
import CertificateOfOrigin from "@/features/documents/templates/CertificateOfOrigin";
import BillOfLading from "@/features/documents/templates/BillOfLading";

const documentTabs = [
  { key: "invoice", label: "Commercial Invoice" },
  { key: "packing-list", label: "Packing List" },
  { key: "beneficiary-certificate", label: "Beneficiary Certificate" },
  { key: "shipping-advice", label: "Shipping Advice" },
  { key: "export-certificate", label: "Export Certificate" },
  { key: "certificate-of-origin", label: "Certificate of Origin" },
  { key: "bill-of-lading", label: "Bill of Lading" },
] as const;

type DocumentKey = (typeof documentTabs)[number]["key"];

interface PrintJob {
  key: DocumentKey;
  label: string;
  recipient?: ShippingAdviceRecipient;
}

// Every document tab, one job each — except Shipping Advice, which expands
// into all 3 recipient copies (customer, insurance, bank) since each is a
// distinct document a client needs.
const PRINT_ALL_JOBS: PrintJob[] = [
  { key: "invoice", label: "Commercial Invoice" },
  { key: "packing-list", label: "Packing List" },
  { key: "beneficiary-certificate", label: "Beneficiary Certificate" },
  { key: "export-certificate", label: "Export Certificate" },
  { key: "certificate-of-origin", label: "Certificate of Origin" },
  { key: "bill-of-lading", label: "Bill of Lading" },
  { key: "shipping-advice", recipient: "customer", label: "Shipping Advice (Customer Copy)" },
  { key: "shipping-advice", recipient: "insurance", label: "Shipping Advice (Insurance Copy)" },
  { key: "shipping-advice", recipient: "bank", label: "Shipping Advice (Bank Copy)" },
];

export default function GeneratedDocuments() {
  const navigate = useNavigate();
  const { id, shipmentId } = useParams<{ id: string; shipmentId: string }>();
  const settings = useSettings();
  const [active, setActive] = useState<DocumentKey>("invoice");
  const [activeStockId, setActiveStockId] = useState<string | undefined>(undefined);
  const [shippingAdviceRecipient, setShippingAdviceRecipient] =
    useState<ShippingAdviceRecipient>("customer");
  const [printAll, setPrintAll] = useState(false);
  const [individualQueue, setIndividualQueue] = useState<PrintJob[] | null>(null);

  useEffect(() => {
    if (!printAll) return;
    const timeout = setTimeout(() => window.print(), 300);
    return () => clearTimeout(timeout);
  }, [printAll]);

  useEffect(() => {
    if (!individualQueue || individualQueue.length === 0) return;
    const job = individualQueue[0];
    setActive(job.key);
    if (job.recipient) setShippingAdviceRecipient(job.recipient);
    const timeout = setTimeout(() => window.print(), 400);
    return () => clearTimeout(timeout);
  }, [individualQueue]);

  useEffect(() => {
    const onAfterPrint = () => {
      setPrintAll(false);
      setIndividualQueue((queue) => {
        if (!queue) return null;
        const rest = queue.slice(1);
        return rest.length > 0 ? rest : null;
      });
    };
    window.addEventListener("afterprint", onAfterPrint);
    return () => window.removeEventListener("afterprint", onAfterPrint);
  }, []);

  const lcRecords = useLCRecords();
  const shipmentRecords = useShipmentRecords();
  const lc = id ? lcRecords.find((r) => r.id === id) : undefined;
  const shipment = shipmentId ? shipmentRecords.find((r) => r.id === shipmentId) : undefined;

  useEffect(() => {
    if (lc && !activeStockId) {
      setActiveStockId(lc.vehicles[0]?.id);
    }
  }, [lc, activeStockId]);

  const vehicle = lc?.vehicles.find((v) => v.id === activeStockId);

  useEffect(() => {
    if (!lc || !shipment || !vehicle) return;
    const previousTitle = document.title;
    if (printAll) {
      document.title = `${vehicle.stockId}_ALL DOCUMENTS`;
    } else {
      const label =
        individualQueue?.[0]?.label ??
        documentTabs.find((tab) => tab.key === active)?.label ??
        "Document";
      document.title = `${vehicle.stockId}_${label.toUpperCase()}`;
    }
    return () => {
      document.title = previousTitle;
    };
  }, [active, printAll, individualQueue, lc, shipment, vehicle]);

  if (!lc || !shipment) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Documents not found</h1>
        <Button variant="outline" onClick={() => navigate("/lc")}>
          Back to LC Repository
        </Button>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">No vehicle selected</h1>
        <Button variant="outline" onClick={() => navigate("/lc")}>
          Back to LC Repository
        </Button>
      </div>
    );
  }

  const renderDocument = (key: DocumentKey, recipientOverride?: ShippingAdviceRecipient) => {
    switch (key) {
      case "invoice":
        return (
          <CommercialInvoice lc={lc} shipment={shipment} vehicle={vehicle} logo={settings.logo} />
        );
      case "packing-list":
        return (
          <PackingList lc={lc} shipment={shipment} vehicle={vehicle} logo={settings.logo} />
        );
      case "beneficiary-certificate":
        return (
          <BeneficiaryCertificate
            lc={lc}
            shipment={shipment}
            vehicles={lc.vehicles}
            logo={settings.logo}
          />
        );
      case "shipping-advice":
        return (
          <ShippingAdvice
            lc={lc}
            shipment={shipment}
            vehicles={lc.vehicles}
            logo={settings.logo}
            recipient={recipientOverride ?? shippingAdviceRecipient}
          />
        );
      case "export-certificate":
        return (
          <ExportCertificate lc={lc} shipment={shipment} vehicle={vehicle} logo={settings.logo} />
        );
      case "certificate-of-origin":
        return (
          <CertificateOfOrigin lc={lc} shipment={shipment} vehicle={vehicle} logo={settings.logo} />
        );
      case "bill-of-lading":
        return (
          <BillOfLading lc={lc} shipment={shipment} vehicle={vehicle} logo={settings.logo} />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-3xl font-bold">Generated Documents</h1>
          <p className="mt-2 text-muted-foreground">
            LC {lc.lc.lcNumber} · Invoice {vehicle.stockId}
          </p>
        </div>
        <div className="flex gap-2">
          <EditDocumentDataDialog lc={lc} shipment={shipment} vehicle={vehicle} />
          <Button variant="outline" onClick={() => setPrintAll(true)}>
            <Files className="size-4" />
            Print All (Stock {vehicle.stockId})
          </Button>
          <Button
            variant="outline"
            onClick={() => setIndividualQueue([...PRINT_ALL_JOBS])}
          >
            <FileStack className="size-4" />
            Print All (Separate Files)
          </Button>
          <Button onClick={() => window.print()}>
            <Printer className="size-4" />
            Print
          </Button>
        </div>
      </div>

      {!printAll && !individualQueue && (
        <>
          <div className="flex flex-wrap gap-2 print:hidden">
            {lc.vehicles.map((v) => (
              <Button
                key={v.id}
                type="button"
                variant={activeStockId === v.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveStockId(v.id)}
              >
                {v.stockId}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 print:hidden">
            {documentTabs.map((tab) => (
              <Button
                key={tab.key}
                type="button"
                variant={active === tab.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActive(tab.key)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {active === "shipping-advice" && (
            <div className="flex flex-wrap gap-2 print:hidden">
              {(
                [
                  { key: "insurance", label: "Insurance Copy" },
                  { key: "customer", label: "Customer Copy" },
                  { key: "bank", label: "Bank Copy" },
                ] as const
              ).map((r) => (
                <Button
                  key={r.key}
                  type="button"
                  variant={shippingAdviceRecipient === r.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShippingAdviceRecipient(r.key)}
                >
                  {r.label}
                </Button>
              ))}
            </div>
          )}
        </>
      )}

      {individualQueue && (
        <p className="text-sm text-muted-foreground print:hidden">
          Printing {individualQueue[0]?.label} ({PRINT_ALL_JOBS.length - individualQueue.length + 1}{" "}
          of {PRINT_ALL_JOBS.length}) for Stock {vehicle.stockId} — save each file as its
          print dialog opens, and the next one will follow automatically.
        </p>
      )}

      {!printAll && (
        <div className="rounded-xl border bg-slate-50 p-6 print:border-0 print:bg-white print:p-0">
          <PrintFitPage>{renderDocument(active)}</PrintFitPage>
        </div>
      )}

      {printAll && (
        <div className="space-y-8">
          <p className="text-sm text-muted-foreground print:hidden">
            Preparing all documents for Stock {vehicle.stockId} — the print
            dialog will open automatically.
          </p>
          {PRINT_ALL_JOBS.map((job, i) => (
            <div
              key={`${job.key}-${job.recipient ?? i}`}
              className="print-page-break rounded-xl border bg-slate-50 p-6 print:border-0 print:bg-white print:p-0"
            >
              <PrintFitPage>{renderDocument(job.key, job.recipient)}</PrintFitPage>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
