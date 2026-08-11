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

  // Shipping Advice
  engineNumber: string;
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

export interface ShipmentRecord {
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
}
