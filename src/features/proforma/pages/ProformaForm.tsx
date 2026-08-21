import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormField from "@/components/common/FormField";
import ProformaVehicleSection from "@/features/proforma/components/ProformaVehicleSection";
import {
  proformaFormSchema,
  type ProformaFormValues,
} from "@/features/proforma/schema/proformaSchema";
import {
  addProformaInvoice,
  getProformaInvoiceById,
  updateProformaInvoice,
} from "@/features/proforma/store/proformaStore";

const defaultValues: ProformaFormValues = {
  companyName: "",
  companyTagline: "",
  companyAddress: "",
  companyContact: "",
  companyWebsite: "",
  currency: "USD",
  invoiceNo: "",
  issueDate: "",
  importerName: "",
  importerAddress: "",
  importerBankName: "",
  importerBankAddress: "",
  transshipment: "MUST BE ALLOWED",
  partialShipment: "MUST BE ALLOWED",
  periodOfPresentation: "",
  shipVessel: "",
  countryOfOrigin: "JAPAN",
  portOfLoading: "",
  countryOfDischarge: "",
  portOfDischarge: "",
  shippingMark: "",
  beneficiaryBankName: "",
  beneficiaryBankAddress: "",
  beneficiarySwiftCode: "",
  beneficiaryBranchCode: "",
  beneficiaryAccountName: "",
  beneficiaryBranchName: "",
  beneficiaryAccountNo: "",
  lcNotice:
    "**For dealing with LC only, we recommend you to ask your bank to channel L/C directly to our above bank in JAPAN.",
  vehicles: [],
};

export default function ProformaForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const existing = id ? getProformaInvoiceById(id) : undefined;
  const isEditMode = Boolean(existing);

  const form = useForm<ProformaFormValues>({
    resolver: zodResolver(proformaFormSchema),
    defaultValues: existing ?? defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: ProformaFormValues) => {
    if (isEditMode && existing) {
      updateProformaInvoice(existing.id, values);
      toast.success("Proforma invoice updated");
      navigate(`/proforma/${existing.id}`);
    } else {
      const created = addProformaInvoice(values);
      toast.success("Proforma invoice saved");
      navigate(`/proforma/${created.id}`);
    }
  };

  const onInvalid = () => {
    toast.error("Please fix the highlighted fields");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isEditMode ? "Edit Proforma Invoice" : "New Proforma Invoice"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Standalone document, issued before an LC exists. Not linked to the LC
          Repository.
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company / Letterhead</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <FormField label="Company Name" error={errors.companyName?.message}>
                <Input placeholder="RIMI INTERNATIONAL CO. LTD" {...register("companyName")} />
              </FormField>
              <FormField label="Tagline">
                <Input placeholder="Japanese Used Car Exporters" {...register("companyTagline")} />
              </FormField>
              <FormField label="Contact">
                <Input placeholder="+81-45-936-0776; Fax: +81-45-932-2376" {...register("companyContact")} />
              </FormField>
              <FormField
                label="Address"
                error={errors.companyAddress?.message}
                className="md:col-span-2 xl:col-span-2"
              >
                <Input placeholder="RIMI BLD, 1-24-1, NAKAYAMA MIDORI-KU, YOKOHAMA, JAPAN." {...register("companyAddress")} />
              </FormField>
              <FormField label="Website">
                <Input placeholder="http://www.rimi.co.jp" {...register("companyWebsite")} />
              </FormField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Importer &amp; Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <FormField label="Currency" error={errors.currency?.message}>
                <Input placeholder="USD" {...register("currency")} />
              </FormField>
              <FormField label="Invoice No" error={errors.invoiceNo?.message}>
                <Input {...register("invoiceNo")} />
              </FormField>
              <FormField label="Issue Date" error={errors.issueDate?.message}>
                <Input type="date" {...register("issueDate")} />
              </FormField>
              <FormField label="IRC Name" error={errors.importerName?.message}>
                <Input {...register("importerName")} />
              </FormField>
              <FormField
                label="Importer Address"
                error={errors.importerAddress?.message}
                className="md:col-span-2"
              >
                <Textarea rows={3} {...register("importerAddress")} />
              </FormField>
              <FormField label="Importer's Bank Name">
                <Input {...register("importerBankName")} />
              </FormField>
              <FormField label="Importer's Bank Address" className="md:col-span-2">
                <Input {...register("importerBankAddress")} />
              </FormField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipment Terms &amp; Conditions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <FormField label="Transshipment">
                <Input {...register("transshipment")} />
              </FormField>
              <FormField label="Partial Shipment">
                <Input {...register("partialShipment")} />
              </FormField>
              <FormField label="Period of Presentation">
                <Input placeholder="21 DAYS" {...register("periodOfPresentation")} />
              </FormField>
              <FormField label="Ship / Vessel">
                <Input placeholder="RORO" {...register("shipVessel")} />
              </FormField>
              <FormField label="Country of Origin">
                <Input {...register("countryOfOrigin")} />
              </FormField>
              <FormField label="Port of Loading">
                <Input placeholder="ANY PORT OF JAPAN" {...register("portOfLoading")} />
              </FormField>
              <FormField label="Country of Discharge">
                <Input {...register("countryOfDischarge")} />
              </FormField>
              <FormField label="Port of Discharge">
                <Input {...register("portOfDischarge")} />
              </FormField>
              <FormField label="Shipping Mark">
                <Input {...register("shippingMark")} />
              </FormField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bank Details of Beneficiary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <FormField label="Bank Name">
                <Input {...register("beneficiaryBankName")} />
              </FormField>
              <FormField label="Swift Code">
                <Input {...register("beneficiarySwiftCode")} />
              </FormField>
              <FormField label="Branch Code">
                <Input {...register("beneficiaryBranchCode")} />
              </FormField>
              <FormField label="Bank Address" className="md:col-span-2">
                <Input {...register("beneficiaryBankAddress")} />
              </FormField>
              <FormField label="Branch Name">
                <Input {...register("beneficiaryBranchName")} />
              </FormField>
              <FormField label="Account Name">
                <Input {...register("beneficiaryAccountName")} />
              </FormField>
              <FormField label="Account No">
                <Input {...register("beneficiaryAccountNo")} />
              </FormField>
              <FormField label="LC Notice" className="md:col-span-2 xl:col-span-3">
                <Textarea rows={2} {...register("lcNotice")} />
                <p className="mt-1 text-xs text-muted-foreground">
                  Printed in red below the bank details on the document.
                </p>
              </FormField>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Description — Used/Recondition Motor Vehicle(s)</CardTitle>
            </CardHeader>
            <CardContent>
              <ProformaVehicleSection />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => navigate("/proforma")}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Save Changes" : "Save & Generate"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
