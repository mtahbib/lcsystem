/*
 * Reset browser storage and seed complete, client-ready demo data.
 *
 * HOW TO USE:
 * 1. Open the app in your browser (e.g. http://localhost:5174).
 * 2. Open DevTools (F12 or Cmd+Option+I) and go to the Console tab.
 * 3. Paste this entire file's contents and press Enter.
 * 4. Refresh the page.
 *
 * This clears ALL existing data in this browser and replaces it with one
 * fully filled-out LC (2 vehicles), its shipment/documents, and one Proforma
 * Invoice — the exact same data shape the real Create LC / Master Form /
 * Proforma Invoice forms produce when submitted, with every field populated
 * so nothing prints blank on a document. It only affects the browser you run
 * it in. It will NOT appear for anyone else, and it will NOT appear on your
 * deployed site unless you run this same script in a browser pointed at
 * that deployed URL.
 */

(function seedDemoData() {
  localStorage.clear();

  const now = new Date().toISOString();

  const vehicle1 = {
    id: crypto.randomUUID(),
    stockId: "111",
    model: "TOYOTA COROLLA AXIO",
    year: "2019",
    chassis: "NRE161-0083771",
    cc: "1490",
    color: "SILVER",
    hsCode: "8703.22.11",
    fob: "9500",
    freight: "500",
    cfr: "10000",
    portOfLoading: "NAGOYA, JAPAN",
    portOfDeparture: "NAGOYA",
    dateOfDeparture: "2026-08-10",
    netWeight: "1090",
    grossWeight: "1365",

    certificateNo: "05422",
    registrationNo: "SHINAGAWA 59C RO 9299",
    regDate: "2025-07-22",
    firstRegDate: "2020-07-01",
    vehicleType: "SMALL",
    useType: "PASSENGER",
    personalUse: "PRIVATE",
    workUse: "N/A",
    shapeOfCar: "BOX SHAPE",
    make: "TOYOTA",
    modelCode: "DBA-NRE161",
    capacity: "5",
    carryingCap: "5 PERSONS",
    chassisModel: "NRE161-0090648",
    engineModel: "2NR",
    length: "440",
    width: "169",
    height: "146",
    ventilation: "1.49KW",
    fuel: "GASOLINE",
    ownerName: "TOYOTA MOBILITY SERVICE CO., LTD.",
    ownerAddress: "TOKYO PREFECTURE, CHUO-WARD, NIHONBASHIHAMACHO 2-12-4",
    userName: "TOYOTA MOBILITY SERVICE CO., LTD.",
    userAddress: "TOKYO PREFECTURE, CHUO-WARD, NIHONBASHIHAMACHO 2-12-4",
    localityOfUse: "TOKYO, JAPAN",
    expiryDate: "2025-10-25",

    originCertificateNo: "258217",

    blNo: "SBCGP95AA034",
    engineNo: "2NR 1194852",
    measurementCbm: "10.857",
    declaredValue: "10000",
    blQuantityText: "1 UNIT(S)",
    blGoodsType: "USED/RECONDITION VEHICLE",
    blQuantityWords: "SAY: ONE (1) UNIT(S) ONLY",
  };

  const vehicle2 = {
    id: crypto.randomUUID(),
    stockId: "113",
    model: "TOYOTA COROLLA TOURING HYBRID",
    year: "2020",
    chassis: "ZWE211-6008490",
    cc: "1790",
    color: "PEARL WHITE",
    hsCode: "8703.40.12",
    fob: "10900",
    freight: "300",
    cfr: "11200",
    portOfLoading: "YOKOHAMA, JAPAN",
    portOfDeparture: "YOKOHAMA",
    dateOfDeparture: "2026-08-11",
    netWeight: "1190",
    grossWeight: "1465",

    certificateNo: "05431",
    registrationNo: "YOKOHAMA 330 A 4521",
    regDate: "2025-08-02",
    firstRegDate: "2020-11-15",
    vehicleType: "SMALL",
    useType: "PASSENGER",
    personalUse: "PRIVATE",
    workUse: "N/A",
    shapeOfCar: "BOX SHAPE",
    make: "TOYOTA",
    modelCode: "6AA-ZWE211",
    capacity: "5",
    carryingCap: "5 PERSONS",
    chassisModel: "ZWE211-6011234",
    engineModel: "2ZR-FXE",
    length: "460",
    width: "180",
    height: "143",
    ventilation: "1.79KW",
    fuel: "HYBRID",
    ownerName: "SUMITOMO MITSUI AUTO LEASE CO., LTD.",
    ownerAddress: "TOKYO PREFECTURE, MINATO-WARD, SHIBAURA 1-2-3",
    userName: "SUMITOMO MITSUI AUTO LEASE CO., LTD.",
    userAddress: "TOKYO PREFECTURE, MINATO-WARD, SHIBAURA 1-2-3",
    localityOfUse: "YOKOHAMA, JAPAN",
    expiryDate: "2025-11-30",

    originCertificateNo: "258229",

    blNo: "SBCGP95AA041",
    engineNo: "2ZR 2081164",
    measurementCbm: "11.204",
    declaredValue: "11200",
    blQuantityText: "1 UNIT(S)",
    blGoodsType: "USED/RECONDITION VEHICLE",
    blQuantityWords: "SAY: ONE (1) UNIT(S) ONLY",
  };

  const lc = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    customer: {
      details: "AHMED TRADING\n75, SABUJBAG, DHAKA-1214 BANGLADESH.",
    },
    beneficiary: {
      details:
        "TMT CORPORATION CO., LTD.\nADDRESS: 934-0027 TOYAMA-KEN,\nIMIZU-SHI, NAKASHINMINATO 17-1,\nAPA GARDEN PALACE NAKASHIN 715 JAPAN\nTEL: 0766-73-6255\nFAX: 0766-50-8574\nWEBSITE: www.tmtcarz.com",
    },
    vehicles: [vehicle1, vehicle2],
    lc: {
      lcNumber: "216624010256",
      issueDate: "2025-12-01",
      currency: "USD",
    },
  };

  const shipment = {
    id: crypto.randomUUID(),
    lcId: lc.id,
    createdAt: now,
    updatedAt: now,

    invoiceDate: "2026-08-12",
    coverNoteNo: "ICI/MJB/MC-0398/08/2025",
    coverNoteDate: "2025-08-24",

    vesselName: "MALAYSIA BRAVE",
    voyageNo: "83",
    arrivalDate: "2026-09-15",
    dispatchMethod: "SEA",
    shipmentType: "RORO",
    termsOfPayment: "CFR (INCOTERMS 2020) CHATTOGRAM, BANGLADESH PAYMENT AGAINST LC",
    portOfDischarge: "CHATTOGRAM, BANGLADESH",
    countryOfOrigin: "JAPAN",
    destination: "BANGLADESH",
    shippingMarks: "AUTHENTIC AUTO / 01819285504",

    remarks:
      "LCAF: 10062454\nIRC NO: 260326111121620\nAPPLICANT TIN: 430533774472\nISSUING BANK BIN: 000096915-0208",
    additionalInfo:
      "* ALL OTHER DETAILS ARE AS PER PROFORMA INVOICE NO.TMT202411280003 DATED: 29.11.2024",
    certifications:
      "LC-216624010256-F46A:05\tWE CERTIFY THAT, SHIPMENT ON ISRAELI/IRAQ/SYRIA FLAG VESSELS ARE PROHIBITED.\nLC-216624010256-F46A:09\tWE CERTIFY THAT, THE GOODS HAVE BEEN SUPPLIED AS PER SPECIFICATION.",
    exportManager: "EXPORT MANAGER\nTMT CORPORATION CO., LTD.",

    consignee:
      "TO THE ORDER OF\nAL-ARAFAH ISLAMI BANK PLC. MOTIJHEEL BRANCH,\n161, RAHMAN MANSION MOTIJHEEL C/A, DHAKA-1000,\nBANGLADESH",
    issuedBy: "issued by\nThe Yokohama Chamber of Commerce & Industry\nYokohama, Japan",
    originPlace: "YOKOHAMA",

    insuranceDetails:
      "ISLAMI COMMERCIAL INSURANCE BANGLADESH LIMITED\nHEAD OFFICE\nCITY CENTER, LEVEL-16, DHAKA-1000, BANGLADESH.",
    bankDetails:
      "AL-ARAFAH ISLAMI BANK PLC.\nMOTIJHEEL BRANCH\n161, RAHMAN MANSION MOTIJHEEL C/A, DHAKA-1000, BANGLADESH",
    otherRemarks:
      "* ISSUING BANK: AL-ARAFAH ISLAMI BANK PLC. MOTIJHEEL BRANCH, DHAKA-1000, BANGLADESH",

    forwardingAgent: "YUSEN KOUN",
    carrierName: "EASTERN CAR LINER, LTD.",
    blReferenceNo: "REF-20260812-111",
    charterPartyDate: "2025-09-01",
    freightAgentBlock:
      "ANCIENT STEAMSHIP COMPANY LIMITED\nHakim Mansion (2nd Floor),\n87 Strand Road, Double Mooring,\nChittagong - 4100, Bangladesh\nTel: +880 233 331 7371-4,\nFax: +880 233 332 7051\nEmail: ops@ancientsteamship.com",
    freightTerms: "FREIGHT PREPAID AS ARRANGED",
    exRate: "¥",
    freightPrepaidAt: "TOKYO, JAPAN",
    freightPayableAt: "CHATTOGRAM, BANGLADESH",
    blIssuePlace: "TOKYO, JAPAN",
    blIssueDate: "2025-09-10",
    totalPrepaidInYen: "1,500,000",
    noOfOriginalBL: "THREE (3)",
    carrierSignatory:
      "EASTERN CAR LINER, LTD. AS AGENT\nFOR REGIONAL CAR LINER SDN. BHD.\nAS CARRIER",
    formVersionNo: "Version/2021  FORM NO. E",
    blTermsText:
      "Shipped on board the Goods or container(s) or package(s)said to contain Goods marked and numbered as hereunder, in apparent good order and condition unless otherwise indicated here-in, to be transported subject to all the terms and conditions of this Bill of Lading, to the port of discharge named herein and/or such other port or place as authorized or permitted hereby or so near thereto as she may safely get and leave always afloat at all stages and conditions of water and weather, and there to be delivered (if required) to the party entitled thereto, on payment. No representation is made by the Carrier as to the weight, contents, measure, quantity, quality, description,condition,marks,numbers or value of the Goods and the Carrier shall be under no responsibility whatsoever in respect of such description or particulars. One signed Bill of Lading must be surrendered duly endorsed in exchange for the Goods or delivery order.",
    blDeclaredValueClause: "if no value declared, liability limit applies as per clause 33(4) over leaf.",
    blAcceptanceText:
      "In accepting the Bill of Lading, the shipper, owner and consignee of the Goods, and the holder of this Bill of Lading agree to be bound by all its stipulations, exceptions and conditions appearing on the face and back hereof, whether written, stamped, printed or otherwise incorporated, as fully as if they were all signed by such shipper, owner, consignee or holder notwithstanding any local custom or privileges to the contrary. The terms hereof shall not be deemed waived by the Carrier except by written waiver, signed by duly authorized agent of the Carrier. In witness whereof, the original Bills of Lading have been signed, all of this tenor and date, one of which being accomplished, the others to stand void.",

    // Bill of Lading — field labels / headings (standard wording; all editable
    // from the Edit dialog on Generated Documents)
    blLabelTitle: "BILL OF LADING",
    blLabelForwardingAgent: "Forwarding Agent:",
    blLabelShipper: "Shipper",
    blLabelBlNo: "B/L No.",
    blLabelReferenceNo: "Reference No.",
    blLabelCharterPartyDate: "Charter party dated on",
    blLabelConsignee: "Consignee",
    blLabelNotifyParty: "Notify party",
    blLabelFromMerchantRef: "From (for the Merchant reference)",
    blLabelPortOfLoading: "Port of Loading",
    blLabelFirstVessel: "First Vessel",
    blLabelVoyNo: "Voy.NO.",
    blLabelSecondVessel: "Second Vessel",
    blLabelPortOfTranshipment: "Port of Transhipment",
    blLabelPortOfDischarge: "Port of Discharge",
    blLabelTranshipmentTo: "For transhipment to (if transhipped at port of discharge)",
    blLabelFinalDestination: "Final Destination (for the Merchant reference)",
    blLabelMarksNumbers: "Marks & Numbers",
    blLabelPkgsKind: ": No. of pkgs. : Kind of packages; Description of goods",
    blLabelNoOfUnits: ": No. of Units : SAID TO BE",
    blLabelGrossWeightKgs: ": Gross weight kgs.",
    blLabelSaidToWeigh: ": SAID TO WEIGH",
    blLabelMeasurementM3: ": Measurement M3",
    blLabelSaidToMeasure: ": SAID TO MEASURE",
    blLabelKgs: "KGS",
    blLabelCbm: "CBM",
    blLabelFreightCharges: "Freight and charges",
    blLabelRevenueTons: "Revenue tons",
    blLabelRate: "Rate",
    blLabelPer: "per",
    blLabelPrepaid: "Prepaid",
    blLabelCollect: "Collect",
    blLabelTotalPackagesWords: "Total Number of packages or units(in words)",
    blLabelExRate: "Ex. Rate",
    blLabelDeclaredValue: "Declared value US$",
    blLabelFreightPrepaidAt: "Freight prepaid at",
    blLabelFreightPayableAt: "Freight payable at",
    blLabelPlaceDateIssue: "Place and date of issue",
    blLabelTotalPrepaidYen: "Total prepaid in Yen",
    blLabelNoOriginalBL: "No. of original B(s)/L",
  };

  const proforma = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,

    companyName: "RIMI INTERNATIONAL CO. LTD",
    companyTagline: "Japanese Used Car Exporters",
    companyAddress: "RIMI BLD, 1-24-1, NAKAYAMA MIDORI-KU, YOKOHAMA, JAPAN.",
    companyContact: "+81-45-936-0776; Fax: +81-45-932-2376",
    companyWebsite: "http://www.rimi.co.jp",

    currency: "$",
    invoiceNo: "20260630777020",
    issueDate: "2026-06-30",

    importerName: "HAYAT IMPEX",
    importerAddress:
      "HOSSAIN CHAMBER. 1ST FLOOR,\n105 AGRABAD COMMERCIAL AREA,\nCHITTAGONG 4100, BANGLADESH",

    importerBankName: "AL-ARAFAH ISLAMI BANK PLC.",
    importerBankAddress: "MOTIJHEEL BRANCH, 161, RAHMAN MANSION MOTIJHEEL C/A, DHAKA-1000, BANGLADESH",

    transshipment: "MUST BE ALLOWED",
    partialShipment: "MUST BE ALLOWED",
    periodOfPresentation: "21 DAYS",
    shipVessel: "RORO",
    countryOfOrigin: "JAPAN",
    portOfLoading: "ANY PORT OF JAPAN",
    countryOfDischarge: "BANGLADESH",
    portOfDischarge: "CHATTOGRAM",
    shippingMark: "HAYAT IMPEX /+8801730-339122",

    beneficiaryBankName: "SUMITOMO MITSUI BANKING CORPORATION",
    beneficiaryBankAddress: "232-4 DAIMURACHO, MIDORI-KU, YOKOHAMA-SHI, KANAGAWA.",
    beneficiarySwiftCode: "SMBCJPJT",
    beneficiaryBranchCode: "867",
    beneficiaryAccountName: "RIMI INTERNATIONAL CO. LTD.",
    beneficiaryBranchName: "NAKAYAMA",
    beneficiaryAccountNo: "867-6698613",

    lcNotice:
      "**For dealing with LC only, we recommend you to ask your bank to channel L/C directly to our above bank in JAPAN.",

    vehicles: [
      {
        id: crypto.randomUUID(),
        stockNo: "RIMI21-0114",
        name: "TOYOTA COROLLA CROSS HYBRID",
        chassisNo: "ZVG11-1014127",
        year: "2021",
        cc: "1790",
        color: "GREY",
        hsCode: "8703.40.12",
        unitPrice: "10000",
        freight: "300",
      },
      {
        id: crypto.randomUUID(),
        stockNo: "RIMI21-0126",
        name: "TOYOTA COROLLA CROSS HYBRID",
        chassisNo: "ZVG11-1012215",
        year: "2021",
        cc: "1790",
        color: "PEARL WHITE",
        hsCode: "8703.40.12",
        unitPrice: "10000",
        freight: "300",
      },
      {
        id: crypto.randomUUID(),
        stockNo: "RIMI21-0131",
        name: "TOYOTA PRIUS HYBRID",
        chassisNo: "ZVW51-6222308",
        year: "2021",
        cc: "1790",
        color: "GREY",
        hsCode: "8703.40.12",
        unitPrice: "10900",
        freight: "300",
      },
    ],
  };

  localStorage.setItem("lc-document-system:lc-records", JSON.stringify([lc]));
  localStorage.setItem("lc-document-system:shipment-records", JSON.stringify([shipment]));
  localStorage.setItem("lc-document-system:proforma-invoices", JSON.stringify([proforma]));

  console.log("✅ All data reset and complete demo data seeded:");
  console.log(`   LC ${lc.lc.lcNumber} — ${lc.vehicles.length} vehicles (stock ${vehicle1.stockId}, ${vehicle2.stockId})`);
  console.log(`   Proforma Invoice ${proforma.invoiceNo} — ${proforma.vehicles.length} vehicles`);
  console.log("   Refresh the page to see it in LC Repository / Proforma Invoices.");
  console.log(`   Documents: /lc/${lc.id}/shipments/${shipment.id}/documents`);
  console.log(`   Proforma:  /proforma/${proforma.id}`);
})();
