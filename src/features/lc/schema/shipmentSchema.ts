import { z } from "zod";
import { BL_LABEL_DEFAULTS } from "@/features/lc/constants/billOfLadingLabels";

const blLabelShape = Object.fromEntries(
  Object.keys(BL_LABEL_DEFAULTS).map((key) => [key, z.string()])
) as Record<keyof typeof BL_LABEL_DEFAULTS, z.ZodString>;

export const shipmentFormSchema = z.object({
  invoiceDate: z.string().min(1, "Invoice date is required"),
  coverNoteNo: z.string().min(1, "Cover note number is required"),
  coverNoteDate: z.string().min(1, "Cover note date is required"),

  vesselName: z.string().min(1, "Vessel name is required"),
  voyageNo: z.string().min(1, "Voyage number is required"),
  arrivalDate: z.string().min(1, "Arrival date is required"),
  dispatchMethod: z.string().min(1, "Dispatch method is required"),
  shipmentType: z.string().min(1, "Shipment type is required"),
  termsOfPayment: z.string().min(1, "Terms of payment is required"),
  portOfDischarge: z.string().min(1, "Port of discharge is required"),
  countryOfOrigin: z.string().min(1, "Country of origin is required"),
  destination: z.string().min(1, "Destination is required"),
  shippingMarks: z.string().min(1, "Shipping marks are required"),

  remarks: z.string(),
  additionalInfo: z.string(),
  certifications: z.string(),
  exportManager: z.string().min(1, "Export manager name is required"),

  // Certificate of Origin
  consignee: z.string(),
  issuedBy: z.string(),
  originPlace: z.string(),

  // Shipping Advice
  insuranceDetails: z.string(),
  bankDetails: z.string(),
  otherRemarks: z.string(),

  // Bill of Lading
  forwardingAgent: z.string(),
  carrierName: z.string(),
  blReferenceNo: z.string(),
  charterPartyDate: z.string(),
  freightAgentBlock: z.string(),
  freightTerms: z.string(),
  exRate: z.string(),
  freightPrepaidAt: z.string(),
  freightPayableAt: z.string(),
  blIssuePlace: z.string(),
  blIssueDate: z.string(),
  totalPrepaidInYen: z.string(),
  noOfOriginalBL: z.string(),
  carrierSignatory: z.string(),
  formVersionNo: z.string(),
  blTermsText: z.string(),
  blDeclaredValueClause: z.string(),
  blAcceptanceText: z.string(),

  ...blLabelShape,
});

export type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;
