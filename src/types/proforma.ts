export interface ProformaVehicle {
  id: string;
  stockNo: string;
  name: string;
  chassisNo: string;
  year: string;
  cc: string;
  color: string;
  hsCode: string;
  unitPrice: string;
  freight: string;
}

export interface ProformaInvoiceRecord {
  id: string;
  createdAt: string;
  updatedAt: string;

  companyName: string;
  companyTagline: string;
  companyAddress: string;
  companyContact: string;
  companyWebsite: string;

  currency: string;
  invoiceNo: string;
  issueDate: string;

  importerName: string;
  importerAddress: string;

  importerBankName: string;
  importerBankAddress: string;

  transshipment: string;
  partialShipment: string;
  periodOfPresentation: string;
  shipVessel: string;
  countryOfOrigin: string;
  portOfLoading: string;
  countryOfDischarge: string;
  portOfDischarge: string;
  shippingMark: string;

  beneficiaryBankName: string;
  beneficiaryBankAddress: string;
  beneficiarySwiftCode: string;
  beneficiaryBranchCode: string;
  beneficiaryAccountName: string;
  beneficiaryBranchName: string;
  beneficiaryAccountNo: string;

  vehicles: ProformaVehicle[];
}
