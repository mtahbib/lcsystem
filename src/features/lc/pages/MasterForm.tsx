import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FileStack, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormField from "@/components/common/FormField";
import {
  shipmentFormSchema,
  type ShipmentFormValues,
} from "@/features/lc/schema/shipmentSchema";
import { getLCById, getLCByNumber } from "@/features/lc/store/lcStore";
import {
  addShipment,
  getShipmentsForLC,
} from "@/features/lc/store/shipmentStore";
import type { LCRecord } from "@/types/lc";
import { firstLine } from "@/features/lc/utils";
import { formatDate } from "@/features/documents/templates/documentHelpers";

const emptyDefaultValues: ShipmentFormValues = {
  invoiceDate: "",
  coverNoteNo: "",
  coverNoteDate: "",
  vesselName: "",
  voyageNo: "",
  arrivalDate: "",
  dispatchMethod: "",
  shipmentType: "",
  termsOfPayment: "",
  portOfDischarge: "",
  countryOfOrigin: "",
  destination: "",
  shippingMarks: "",
  remarks: "",
  additionalInfo: "",
  certifications: "",
  exportManager: "",
  consignee: "",
  issuedBy: "",
  originPlace: "",
  insuranceDetails: "",
  bankDetails: "",
  otherRemarks: "",
};

function buildDefaultValues(): ShipmentFormValues {
  return { ...emptyDefaultValues };
}

export default function MasterForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [lcNumberInput, setLcNumberInput] = useState("");
  const [lc, setLc] = useState<LCRecord | undefined>(undefined);
  const [notFound, setNotFound] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: emptyDefaultValues,
  });

  useEffect(() => {
    if (!id) return;
    const record = getLCById(id);
    if (record) {
      setLc(record);
      setLcNumberInput(record.lc.lcNumber);
      reset(buildDefaultValues());
    }
  }, [id, reset]);

  const pastShipments = useMemo(() => (lc ? getShipmentsForLC(lc.id) : []), [lc]);

  const handleFetch = () => {
    const found = getLCByNumber(lcNumberInput);
    if (!found) {
      setLc(undefined);
      setNotFound(true);
      return;
    }
    setNotFound(false);
    setLc(found);
    reset(buildDefaultValues());
    navigate(`/lc/${found.id}/master-form`, { replace: true });
  };

  const onSubmit = (values: ShipmentFormValues) => {
    if (!lc) return;
    const shipment = addShipment(lc.id, values);
    toast.success("Shipment saved — generating documents");
    navigate(`/lc/${lc.id}/shipments/${shipment.id}/documents`);
  };

  const onInvalid = () => {
    toast.error("Please fix the highlighted fields before generating documents");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Master Form</h1>
        <p className="mt-2 text-muted-foreground">
          Enter the LC number to load everything already on file — only shipment
          details need to be entered here. Each vehicle (Stock ID) will get its own
          set of documents, with its Invoice No taken from its Stock ID.
        </p>
      </div>

      <Card>
        <CardContent className="flex items-end gap-3 pt-4">
          <FormField label="LC Number" className="flex-1 max-w-sm">
            <Input
              value={lcNumberInput}
              onChange={(e) => setLcNumberInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFetch()}
              placeholder="e.g. LC-2026-001"
            />
          </FormField>
          <Button type="button" onClick={handleFetch}>
            <Search className="size-4" />
            Fetch LC
          </Button>
        </CardContent>
      </Card>

      {notFound && (
        <p className="text-sm text-destructive">
          No LC found with that number. Check the LC Repository for the exact number.
        </p>
      )}

      {lc && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>LC {lc.lc.lcNumber} — Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm md:grid-cols-3">
              <div>
                <p className="font-medium">Customer</p>
                <p className="text-muted-foreground">{firstLine(lc.customer.details)}</p>
              </div>
              <div>
                <p className="font-medium">Beneficiary</p>
                <p className="text-muted-foreground">{firstLine(lc.beneficiary.details)}</p>
              </div>
              <div>
                <p className="font-medium">LC Details</p>
                <p className="text-muted-foreground">
                  {lc.lc.currency} · Issued {lc.lc.issueDate}
                </p>
              </div>
              <div className="md:col-span-3">
                <p className="mb-1 font-medium">Vehicles ({lc.vehicles.length})</p>
                <div className="flex flex-wrap gap-2">
                  {lc.vehicles.map((v) => (
                    <Badge key={v.id} variant="secondary">
                      {v.stockId} — {v.model} ({v.chassis})
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {pastShipments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Previous Shipments</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {pastShipments.map((s) => (
                  <Button
                    key={s.id}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/lc/${lc.id}/shipments/${s.id}/documents`)}
                  >
                    <FileStack className="size-4" />
                    {formatDate(s.invoiceDate) || "Untitled"}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <FormField label="Invoice Date" error={errors.invoiceDate?.message}>
                  <Input type="date" {...register("invoiceDate")} />
                </FormField>
                <FormField label="Cover Note No" error={errors.coverNoteNo?.message}>
                  <Input {...register("coverNoteNo")} />
                </FormField>
                <FormField label="Cover Note Date" error={errors.coverNoteDate?.message}>
                  <Input type="date" {...register("coverNoteDate")} />
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipment Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <FormField label="Vessel Name" error={errors.vesselName?.message}>
                  <Input {...register("vesselName")} />
                </FormField>
                <FormField label="Voyage No" error={errors.voyageNo?.message}>
                  <Input {...register("voyageNo")} />
                </FormField>
                <FormField label="Method of Dispatch" error={errors.dispatchMethod?.message}>
                  <Input placeholder="SEA" {...register("dispatchMethod")} />
                </FormField>
                <FormField label="Type of Shipment" error={errors.shipmentType?.message}>
                  <Input placeholder="RORO" {...register("shipmentType")} />
                </FormField>
                <FormField label="Terms of Payment" error={errors.termsOfPayment?.message}>
                  <Input placeholder="Payment Against LC" {...register("termsOfPayment")} />
                </FormField>
                <FormField label="Arrival Date" error={errors.arrivalDate?.message}>
                  <Input type="date" {...register("arrivalDate")} />
                </FormField>
                <FormField label="Port of Discharge" error={errors.portOfDischarge?.message}>
                  <Input {...register("portOfDischarge")} />
                </FormField>
                <FormField label="Country of Origin" error={errors.countryOfOrigin?.message}>
                  <Input {...register("countryOfOrigin")} />
                </FormField>
                <FormField label="Final Destination" error={errors.destination?.message}>
                  <Input {...register("destination")} />
                </FormField>
                <FormField label="Shipping Marks" error={errors.shippingMarks?.message}>
                  <Input {...register("shippingMarks")} />
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications (Beneficiary Certificate)</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField label="LC Certification Clauses" error={errors.certifications?.message}>
                  <Textarea
                    rows={6}
                    placeholder={
                      "LC-216624010256-F46A:05\tWE CERTIFY THAT, SHIPMENT ON ISRAELI/IRAQ/SYRIA FLAG VESSELS ARE PROHIBITED.\n" +
                      "LC-216624010256-F46A:06\tWE CERTIFY THAT, COUNTRY OF ORIGIN OF GOODS JAPAN TO BE MENTIONED ON THE BODY OF EACH PACKING UNIT"
                    }
                    {...register("certifications")}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    One clause per line, formatted as{" "}
                    <span className="font-mono">CLAUSE CODE&lt;tab&gt;CERTIFICATION TEXT</span>.
                    Printed on the Beneficiary Certificate.
                  </p>
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificate of Origin</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField label="Consignee" error={errors.consignee?.message} className="md:col-span-2">
                  <Textarea
                    rows={4}
                    placeholder={
                      "TO THE ORDER OF\nAL-ARAFAH ISLAMI BANK PLC. MOTIJHEEL BRANCH,\n161, RAHMAN MANSION MOTIJHEEL C/A, DHAKA-1000,\nBANGLADESH"
                    }
                    {...register("consignee")}
                  />
                </FormField>
                <FormField label="Issued By" error={errors.issuedBy?.message}>
                  <Textarea
                    rows={3}
                    placeholder={"issued by\nThe Yokohama Chamber of Commerce & Industry\nYokohama, Japan"}
                    {...register("issuedBy")}
                  />
                </FormField>
                <FormField label="Place (for declaration/date line)" error={errors.originPlace?.message}>
                  <Input placeholder="YOKOHAMA" {...register("originPlace")} />
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Advice — Party Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <FormField label="Insurance Details" error={errors.insuranceDetails?.message}>
                  <Textarea
                    rows={4}
                    placeholder={
                      "ISLAMI COMMERCIAL INSURANCE BANGLADESH LIMITED\nHEAD OFFICE\nCITY CENTER, LEVEL-16, (OWN SPACE), 90/1, MOTIJHEEL C/A, DHAKA-1000, BANGLADESH."
                    }
                    {...register("insuranceDetails")}
                  />
                </FormField>
                <FormField label="Bank Details" error={errors.bankDetails?.message}>
                  <Textarea
                    rows={4}
                    placeholder={
                      "AL-ARAFAH ISLAMI BANK PLC.\nMOTIJHEEL BRANCH\n161, RAHMAN MANSION MOTIJHEEL C/A, DHAKA-1000, BANGLADESH"
                    }
                    {...register("bankDetails")}
                  />
                </FormField>
                <FormField label="Other Remarks" error={errors.otherRemarks?.message}>
                  <Textarea
                    rows={4}
                    placeholder={
                      "* ISSUING BANK: AL-ARAFAH ISLAMI BANK PLC. MOTIJHEEL BRANCH, 161, RAHMAN MANSION MOTIJHEEL C/A, DHAKA-1000, BANGLADESH"
                    }
                    {...register("otherRemarks")}
                  />
                </FormField>
                <p className="text-xs text-muted-foreground md:col-span-3">
                  Used only by Shipping Advice. Customer Details, Method of Dispatch,
                  Vessel, Ports, Remarks, etc. are already shared from the fields
                  above — only these three blocks differ per recipient copy
                  (Insurance / Customer / Bank).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Remarks &amp; Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField label="Remarks" error={errors.remarks?.message}>
                  <Textarea
                    rows={6}
                    placeholder={"LCAF: 10062454\nIRC NO: 260326111121620\nAPPLICANT TIN: 430533774472"}
                    {...register("remarks")}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Type each line exactly as it should appear under "Remarks" on
                    documents.
                  </p>
                </FormField>
                <FormField label="Additional Information" error={errors.additionalInfo?.message}>
                  <Textarea
                    rows={6}
                    placeholder={"* ALL OTHER DETAILS ARE AS PER PROFORMA INVOICE...\n* WE CERTIFY THAT MERCHANDISE TO BE OF JAPAN ORIGIN..."}
                    {...register("additionalInfo")}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Type each line exactly as it should appear under "Additional
                    Information" on documents.
                  </p>
                </FormField>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Signature</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField label="Export Manager" error={errors.exportManager?.message}>
                  <Input {...register("exportManager")} />
                </FormField>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => navigate("/lc")}>
                Cancel
              </Button>
              <Button type="submit">Generate Documents</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
