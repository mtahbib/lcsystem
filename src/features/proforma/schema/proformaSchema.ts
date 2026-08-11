import { z } from "zod";

export const proformaVehicleSchema = z.object({
  id: z.string(),
  stockNo: z.string().min(1, "Required"),
  name: z.string().min(1, "Required"),
  chassisNo: z.string().min(1, "Required"),
  year: z.string().min(1, "Required"),
  cc: z.string().min(1, "Required"),
  color: z.string().min(1, "Required"),
  hsCode: z.string().min(1, "Required"),
  unitPrice: z.string().min(1, "Required"),
  freight: z.string().min(1, "Required"),
});

export const proformaFormSchema = z.object({
  companyName: z.string().min(1, "Required"),
  companyTagline: z.string(),
  companyAddress: z.string().min(1, "Required"),
  companyContact: z.string(),
  companyWebsite: z.string(),

  currency: z.string().min(1, "Required"),
  invoiceNo: z.string().min(1, "Required"),
  issueDate: z.string().min(1, "Required"),

  importerName: z.string().min(1, "Required"),
  importerAddress: z.string().min(1, "Required"),

  importerBankName: z.string(),
  importerBankAddress: z.string(),

  transshipment: z.string(),
  partialShipment: z.string(),
  periodOfPresentation: z.string(),
  shipVessel: z.string(),
  countryOfOrigin: z.string(),
  portOfLoading: z.string(),
  countryOfDischarge: z.string(),
  portOfDischarge: z.string(),
  shippingMark: z.string(),

  beneficiaryBankName: z.string(),
  beneficiaryBankAddress: z.string(),
  beneficiarySwiftCode: z.string(),
  beneficiaryBranchCode: z.string(),
  beneficiaryAccountName: z.string(),
  beneficiaryBranchName: z.string(),
  beneficiaryAccountNo: z.string(),

  vehicles: z.array(proformaVehicleSchema).min(1, "Add at least one vehicle"),
});

export type ProformaFormValues = z.infer<typeof proformaFormSchema>;
