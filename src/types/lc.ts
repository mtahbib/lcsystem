import type { BlLabelKey } from "@/features/lc/constants/billOfLadingLabels";

export interface Vehicle {
  id: string;
  stockId: string;
  model: string;
  year: string;
  chassis: string;
  cc: string;
  color: string;
  hsCode: string;
  fob: string;
  freight: string;
  cfr: string;
  portOfLoading: string;
  portOfDeparture: string;
  dateOfDeparture: string;
  netWeight: string;
  grossWeight: string;

  // Export Certificate details (per vehicle)
  certificateNo: string;
  registrationNo: string;
  regDate: string;
  firstRegDate: string;
  vehicleType: string;
  useType: string;
  personalUse: string;
  workUse: string;
  shapeOfCar: string;
  make: string;
  modelCode: string;
  capacity: string;
  carryingCap: string;
  chassisModel: string;
  engineModel: string;
  length: string;
  width: string;
  height: string;
  ventilation: string;
  fuel: string;
  ownerName: string;
  ownerAddress: string;
  userName: string;
  userAddress: string;
  localityOfUse: string;
  expiryDate: string;

  // Certificate of Origin
  originCertificateNo: string;

  // Bill of Lading
  blNo: string;
  engineNo: string;
  measurementCbm: string;
  declaredValue: string;
  blQuantityText: string;
  blGoodsType: string;
  blQuantityWords: string;
}

export interface LCRecord {
  id: string;
  createdAt: string;
  updatedAt: string;

  customer: {
    details: string;
  };

  beneficiary: {
    details: string;
  };

  vehicles: Vehicle[];

  lc: {
    lcNumber: string;
    issueDate: string;
    currency: string;
  };
}

export interface ShipmentRecord extends Record<BlLabelKey, string> {
  id: string;
  lcId: string;
  createdAt: string;
  updatedAt: string;

  invoiceDate: string;
  coverNoteNo: string;
  coverNoteDate: string;

  vesselName: string;
  voyageNo: string;
  arrivalDate: string;
  dispatchMethod: string;
  shipmentType: string;
  termsOfPayment: string;
  portOfDischarge: string;
  countryOfOrigin: string;
  destination: string;
  shippingMarks: string;

  remarks: string;
  additionalInfo: string;
  certifications: string;
  exportManager: string;

  // Certificate of Origin
  consignee: string;
  issuedBy: string;
  originPlace: string;

  // Shipping Advice
  insuranceDetails: string;
  bankDetails: string;
  otherRemarks: string;

  // Bill of Lading
  forwardingAgent: string;
  carrierName: string;
  blReferenceNo: string;
  charterPartyDate: string;
  freightAgentBlock: string;
  freightTerms: string;
  exRate: string;
  freightPrepaidAt: string;
  freightPayableAt: string;
  blIssuePlace: string;
  blIssueDate: string;
  totalPrepaidInYen: string;
  noOfOriginalBL: string;
  carrierSignatory: string;
  formVersionNo: string;
  blTermsText: string;
  blDeclaredValueClause: string;
  blAcceptanceText: string;
}
