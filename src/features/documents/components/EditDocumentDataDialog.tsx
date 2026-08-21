import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormField from "@/components/common/FormField";
import { vehicleSchema } from "@/features/lc/schema/lcSchema";
import { shipmentFormSchema } from "@/features/lc/schema/shipmentSchema";
import { updateLC } from "@/features/lc/store/lcStore";
import { updateShipment } from "@/features/lc/store/shipmentStore";
import { BL_LABEL_FIELDS } from "@/features/lc/constants/billOfLadingLabels";
import type { LCRecord, ShipmentRecord, Vehicle } from "@/types/lc";

const editSchema = z.object({
  vehicle: vehicleSchema,
  shipment: shipmentFormSchema,
});

type EditValues = z.infer<typeof editSchema>;

interface FieldMeta {
  key: string;
  label: string;
  type?: string;
  multiline?: boolean;
}

const VEHICLE_CORE_FIELDS: FieldMeta[] = [
  { key: "stockId", label: "Stock ID" },
  { key: "model", label: "Model" },
  { key: "year", label: "Year" },
  { key: "chassis", label: "Chassis" },
  { key: "cc", label: "CC" },
  { key: "color", label: "Color" },
  { key: "hsCode", label: "HS Code" },
  { key: "fob", label: "FOB" },
  { key: "freight", label: "Freight" },
  { key: "cfr", label: "CFR" },
  { key: "portOfLoading", label: "Port of Loading" },
  { key: "portOfDeparture", label: "Port of Departure" },
  { key: "dateOfDeparture", label: "Date of Departure", type: "date" },
  { key: "netWeight", label: "Net Weight" },
  { key: "grossWeight", label: "Gross Weight" },
];

const VEHICLE_CERT_FIELDS: FieldMeta[] = [
  { key: "certificateNo", label: "Export Certificate No" },
  { key: "originCertificateNo", label: "Certificate of Origin No" },
  { key: "registrationNo", label: "Registration No" },
  { key: "regDate", label: "Reg. Date", type: "date" },
  { key: "firstRegDate", label: "First Reg. Date", type: "date" },
  { key: "vehicleType", label: "Type" },
  { key: "useType", label: "Use" },
  { key: "personalUse", label: "Personal Use" },
  { key: "workUse", label: "Work Use" },
  { key: "shapeOfCar", label: "Shape of Car" },
  { key: "make", label: "Make" },
  { key: "modelCode", label: "Model (code)" },
  { key: "capacity", label: "Capacity" },
  { key: "carryingCap", label: "Carrying Cap" },
  { key: "chassisModel", label: "Chassis Model" },
  { key: "engineModel", label: "Engine Model" },
  { key: "length", label: "Length" },
  { key: "width", label: "Width" },
  { key: "height", label: "Height" },
  { key: "ventilation", label: "Ventilation" },
  { key: "fuel", label: "Fuel" },
  { key: "ownerName", label: "Name of Owner" },
  { key: "ownerAddress", label: "Address of Owner" },
  { key: "userName", label: "Name of User" },
  { key: "userAddress", label: "Address of User" },
  { key: "localityOfUse", label: "Locality of Principal Abode of Use" },
  { key: "expiryDate", label: "Effective Date Till Expiry", type: "date" },
  { key: "blNo", label: "B/L No" },
  { key: "engineNo", label: "Engine No" },
  { key: "measurementCbm", label: "Measurement (M3)" },
  { key: "declaredValue", label: "Declared Value" },
  { key: "blQuantityText", label: "B/L — Quantity Text" },
  { key: "blGoodsType", label: "B/L — Goods Type" },
  { key: "blQuantityWords", label: "B/L — Quantity in Words" },
];

const SHIPMENT_CORE_FIELDS: FieldMeta[] = [
  { key: "invoiceDate", label: "Invoice Date", type: "date" },
  { key: "coverNoteNo", label: "Cover Note No" },
  { key: "coverNoteDate", label: "Cover Note Date", type: "date" },
  { key: "vesselName", label: "Vessel Name" },
  { key: "voyageNo", label: "Voyage No" },
  { key: "arrivalDate", label: "Arrival Date", type: "date" },
  { key: "dispatchMethod", label: "Method of Dispatch" },
  { key: "shipmentType", label: "Type of Shipment" },
  { key: "termsOfPayment", label: "Terms of Payment" },
  { key: "portOfDischarge", label: "Port of Discharge" },
  { key: "countryOfOrigin", label: "Country of Origin" },
  { key: "destination", label: "Final Destination" },
  { key: "shippingMarks", label: "Shipping Marks" },
  { key: "originPlace", label: "Origin Certificate — Place" },
  { key: "exportManager", label: "Export Manager" },
  { key: "forwardingAgent", label: "B/L — Forwarding Agent" },
  { key: "carrierName", label: "B/L — Carrier Name" },
  { key: "blReferenceNo", label: "B/L — Reference No" },
  { key: "charterPartyDate", label: "B/L — Charter Party Dated On", type: "date" },
  { key: "freightTerms", label: "B/L — Freight Terms" },
  { key: "exRate", label: "B/L — Ex. Rate" },
  { key: "freightPrepaidAt", label: "B/L — Freight Prepaid At" },
  { key: "freightPayableAt", label: "B/L — Freight Payable At" },
  { key: "blIssuePlace", label: "B/L — Place of Issue" },
  { key: "blIssueDate", label: "B/L — Date of Issue", type: "date" },
  { key: "totalPrepaidInYen", label: "B/L — Total Prepaid in Yen" },
  { key: "noOfOriginalBL", label: "B/L — No. of Original B/L" },
  { key: "formVersionNo", label: "B/L — Form Version / No." },
];

const SHIPMENT_TEXT_FIELDS: FieldMeta[] = [
  { key: "remarks", label: "Remarks", multiline: true },
  { key: "additionalInfo", label: "Additional Information", multiline: true },
  { key: "certifications", label: "Beneficiary Certificate — LC Clauses", multiline: true },
  { key: "consignee", label: "Certificate of Origin — Consignee", multiline: true },
  { key: "issuedBy", label: "Certificate of Origin — Issued By", multiline: true },
  { key: "insuranceDetails", label: "Shipping Advice — Insurance Details", multiline: true },
  { key: "bankDetails", label: "Shipping Advice — Bank Details", multiline: true },
  { key: "otherRemarks", label: "Shipping Advice — Other Remarks", multiline: true },
  { key: "freightAgentBlock", label: "B/L — Freight Agent Block", multiline: true },
  { key: "carrierSignatory", label: "B/L — Carrier Signatory Block", multiline: true },
  { key: "blTermsText", label: "B/L — Terms Paragraph", multiline: true },
  { key: "blDeclaredValueClause", label: "B/L — Declared Value Clause", multiline: true },
  { key: "blAcceptanceText", label: "B/L — Acceptance / Signature Clause", multiline: true },
];

interface Props {
  lc: LCRecord;
  shipment: ShipmentRecord;
  vehicle: Vehicle;
}

export default function EditDocumentDataDialog({ lc, shipment, vehicle }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditValues>({
    resolver: zodResolver(editSchema),
    defaultValues: { vehicle, shipment },
  });

  useEffect(() => {
    reset({ vehicle, shipment });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicle.id, shipment.id]);

  const onSubmit = (values: EditValues) => {
    updateLC(lc.id, {
      ...lc,
      vehicles: lc.vehicles.map((v) =>
        v.id === vehicle.id ? { ...v, ...values.vehicle, id: v.id } : v
      ),
    });
    updateShipment(shipment.id, { ...shipment, ...values.shipment });
    toast.success("Document data updated");
  };

  const renderField = (
    field: FieldMeta,
    section: "vehicle" | "shipment",
    fieldErrors: Record<string, { message?: string } | undefined>
  ) => (
    <FormField key={field.key} label={field.label} error={fieldErrors[field.key]?.message}>
      {field.multiline ? (
        <Textarea rows={3} {...register(`${section}.${field.key}` as `${typeof section}.${string}`)} />
      ) : (
        <Input
          type={field.type}
          {...register(`${section}.${field.key}` as `${typeof section}.${string}`)}
        />
      )}
    </FormField>
  );

  return (
    <Dialog>
      <DialogTrigger render={<Button type="button" variant="outline" size="sm" />}>
        <Pencil className="size-4" />
        Edit {vehicle.stockId || "Details"}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Edit Document Data — Stock {vehicle.stockId || "vehicle"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            These changes apply only to stock {vehicle.stockId} and its per-vehicle
            documents (Commercial Invoice, Packing List, Export Certificate,
            Certificate of Origin, Bill of Lading). Shipment-level fields (vessel,
            ports, remarks, etc.) are shared across every stock in this shipment,
            including the Beneficiary Certificate and Shipping Advice, which list
            all vehicles together.
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-h-[65vh] space-y-6 overflow-y-auto pr-1"
        >
          <section>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
              Vehicle — Core Details
            </h3>
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
              {VEHICLE_CORE_FIELDS.map((f) =>
                renderField(f, "vehicle", errors.vehicle ?? {})
              )}
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
              Vehicle — Export Certificate / Certificate of Origin Details
            </h3>
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
              {VEHICLE_CERT_FIELDS.map((f) =>
                renderField(f, "vehicle", errors.vehicle ?? {})
              )}
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
              Shipment — Core Details
            </h3>
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
              {SHIPMENT_CORE_FIELDS.map((f) =>
                renderField(f, "shipment", errors.shipment ?? {})
              )}
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
              Shipment — Free-text Blocks
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {SHIPMENT_TEXT_FIELDS.map((f) =>
                renderField(f, "shipment", errors.shipment ?? {})
              )}
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
              Bill of Lading — Field Labels / Headings
            </h3>
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
              {BL_LABEL_FIELDS.map((f) => renderField(f, "shipment", errors.shipment ?? {}))}
            </div>
          </section>

          <DialogFooter className="static mx-0 mb-0 border-0 bg-transparent p-0">
            <Button type="submit" disabled={isSubmitting}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
