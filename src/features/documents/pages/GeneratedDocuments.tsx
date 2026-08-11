import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Printer } from "lucide-react";

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

const documentTabs = [
  { key: "invoice", label: "Commercial Invoice" },
  { key: "packing-list", label: "Packing List" },
  { key: "beneficiary-certificate", label: "Beneficiary Certificate" },
  { key: "shipping-advice", label: "Shipping Advice" },
  { key: "export-certificate", label: "Export Certificate" },
  { key: "certificate-of-origin", label: "Certificate of Origin" },
] as const;

type DocumentKey = (typeof documentTabs)[number]["key"];

export default function GeneratedDocuments() {
  const navigate = useNavigate();
  const { id, shipmentId } = useParams<{ id: string; shipmentId: string }>();
  const settings = useSettings();
  const [active, setActive] = useState<DocumentKey>("invoice");
  const [activeStockId, setActiveStockId] = useState<string | undefined>(undefined);
  const [shippingAdviceRecipient, setShippingAdviceRecipient] =
    useState<ShippingAdviceRecipient>("customer");

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
    const label = documentTabs.find((tab) => tab.key === active)?.label ?? "Document";
    const previousTitle = document.title;
    document.title = `${label} - ${vehicle.stockId}`;
    return () => {
      document.title = previousTitle;
    };
  }, [active, lc, shipment, vehicle]);

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
          <Button onClick={() => window.print()}>
            <Printer className="size-4" />
            Print
          </Button>
        </div>
      </div>

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

      <div className="rounded-xl border bg-slate-50 p-6 print:border-0 print:bg-white print:p-0">
        <PrintFitPage>
          {active === "invoice" && (
            <CommercialInvoice
              lc={lc}
              shipment={shipment}
              vehicle={vehicle}
              logo={settings.logo}
            />
          )}
          {active === "packing-list" && (
            <PackingList
              lc={lc}
              shipment={shipment}
              vehicle={vehicle}
              logo={settings.logo}
            />
          )}
          {active === "beneficiary-certificate" && (
            <BeneficiaryCertificate
              lc={lc}
              shipment={shipment}
              vehicles={lc.vehicles}
              logo={settings.logo}
            />
          )}
          {active === "shipping-advice" && (
            <ShippingAdvice
              lc={lc}
              shipment={shipment}
              vehicles={lc.vehicles}
              logo={settings.logo}
              recipient={shippingAdviceRecipient}
            />
          )}
          {active === "export-certificate" && (
            <ExportCertificate
              lc={lc}
              shipment={shipment}
              vehicle={vehicle}
              logo={settings.logo}
            />
          )}
          {active === "certificate-of-origin" && (
            <CertificateOfOrigin
              lc={lc}
              shipment={shipment}
              vehicle={vehicle}
              logo={settings.logo}
            />
          )}
        </PrintFitPage>
      </div>
    </div>
  );
}
