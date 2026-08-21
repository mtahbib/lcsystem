import { z } from "zod";

export const vehicleSchema = z.object({
  id: z.string(),
  stockId: z.string().min(1, "Required"),
  model: z.string().min(1, "Required"),
  year: z.string().min(1, "Required"),
  chassis: z.string().min(1, "Required"),
  cc: z.string().min(1, "Required"),
  color: z.string().min(1, "Required"),
  hsCode: z.string().min(1, "Required"),
  fob: z.string().min(1, "Required"),
  freight: z.string().min(1, "Required"),
  cfr: z.string().min(1, "Required"),
  portOfLoading: z.string().min(1, "Required"),
  portOfDeparture: z.string().min(1, "Required"),
  dateOfDeparture: z.string().min(1, "Required"),
  netWeight: z.string().min(1, "Required"),
  grossWeight: z.string().min(1, "Required"),

  // Export Certificate details (per vehicle, optional until needed)
  certificateNo: z.string(),
  registrationNo: z.string(),
  regDate: z.string(),
  firstRegDate: z.string(),
  vehicleType: z.string(),
  useType: z.string(),
  personalUse: z.string(),
  workUse: z.string(),
  shapeOfCar: z.string(),
  make: z.string(),
  modelCode: z.string(),
  capacity: z.string(),
  carryingCap: z.string(),
  chassisModel: z.string(),
  engineModel: z.string(),
  length: z.string(),
  width: z.string(),
  height: z.string(),
  ventilation: z.string(),
  fuel: z.string(),
  ownerName: z.string(),
  ownerAddress: z.string(),
  userName: z.string(),
  userAddress: z.string(),
  localityOfUse: z.string(),
  expiryDate: z.string(),

  // Certificate of Origin
  originCertificateNo: z.string(),

  // Bill of Lading
  blNo: z.string(),
  engineNo: z.string(),
  measurementCbm: z.string(),
  declaredValue: z.string(),
  blQuantityText: z.string(),
  blGoodsType: z.string(),
  blQuantityWords: z.string(),
});

export const lcFormSchema = z.object({
  customer: z.object({
    details: z.string().min(1, "Customer details are required"),
  }),

  beneficiary: z.object({
    details: z.string().min(1, "Corporation address is required"),
  }),

  vehicles: z.array(vehicleSchema).min(1, "Add at least one vehicle"),

  lc: z.object({
    lcNumber: z.string().min(1, "LC number is required"),
    issueDate: z.string().min(1, "Issue date is required"),
    currency: z.string().min(1, "Currency is required"),
  }),
});

export type LCFormValues = z.infer<typeof lcFormSchema>;
