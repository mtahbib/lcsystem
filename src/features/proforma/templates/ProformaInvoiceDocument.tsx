import type { ProformaInvoiceRecord } from "@/types/proforma";
import PlainMultilineText from "@/components/common/PlainMultilineText";
import { formatDateShort } from "@/features/documents/templates/documentHelpers";

interface Props {
  record: ProformaInvoiceRecord;
  logo: string;
}

function SectionBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1e3a6e] px-3 py-1.5 text-[13px] font-bold tracking-wide text-white">
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-bold">{label}:</span> <span>{value}</span>
    </p>
  );
}

export default function ProformaInvoiceDocument({ record, logo }: Props) {
  const totalCnf = record.vehicles.reduce(
    (sum, v) => sum + (Number(v.unitPrice) || 0) + (Number(v.freight) || 0),
    0
  );

  return (
    <div className="mx-auto max-w-3xl bg-white p-6 text-[12px] text-black print:max-w-none print:p-0">
      <div className="flex items-start gap-4">
        <img src={logo} alt="Company logo" className="h-16 w-16 shrink-0 object-contain" />
        <div>
          <p className="text-lg font-bold">{record.companyName}</p>
          {record.companyTagline && (
            <p className="text-sm font-semibold text-[#1e3a6e]">{record.companyTagline}</p>
          )}
          <div className="mt-1 text-[11px] leading-snug">
            <p>
              <span className="font-bold">ADDRESS:</span> {record.companyAddress}
            </p>
            {record.companyContact && (
              <p>
                <span className="font-bold">CONTACT:</span> {record.companyContact}
              </p>
            )}
            {record.companyWebsite && (
              <p>
                <span className="font-bold">WEBSITE:</span> {record.companyWebsite}
              </p>
            )}
          </div>
        </div>
      </div>

      <h1 className="my-4 text-center text-2xl font-bold text-[#1e3a6e]">
        PROFORMA INVOICE
      </h1>

      <div className="grid grid-cols-2 gap-3">
        <SectionBar>IMPORTER DETAILS</SectionBar>
        <SectionBar>INVOICE DETAILS</SectionBar>
      </div>
      <div className="grid grid-cols-2 gap-3 py-2">
        <div className="space-y-1">
          <Field label="IRC NAME" value={record.importerName} />
          <p className="font-bold">ADDRESS:</p>
          <PlainMultilineText text={record.importerAddress} />
        </div>
        <div className="space-y-1">
          <Field label="INVOICE NO" value={record.invoiceNo} />
          <Field label="ISSUE DATE" value={formatDateShort(record.issueDate)} />
        </div>
      </div>

      {(record.importerBankName || record.importerBankAddress) && (
        <div className="space-y-1 pb-2">
          <Field label="BANK NAME" value={record.importerBankName} />
          <Field label="ADDRESS" value={record.importerBankAddress} />
        </div>
      )}

      <div className="mt-1">
        <SectionBar>SHIPMENT TERMS &amp; CONDITIONS</SectionBar>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 py-2">
        <Field label="TRANSSHIPMENT" value={record.transshipment} />
        <Field label="COUNTRY OF ORIGIN" value={record.countryOfOrigin} />
        <Field label="PARTIAL SHIPMENT" value={record.partialShipment} />
        <Field label="PORT OF LOADING" value={record.portOfLoading} />
        <Field label="PERIOD OF PRESENTATION" value={record.periodOfPresentation} />
        <Field label="COUNTRY OF DISCHARGE" value={record.countryOfDischarge} />
        <Field label="SHIP / VESSEL" value={record.shipVessel} />
        <Field label="PORT OF DISCHARGE" value={record.portOfDischarge} />
      </div>
      <p className="pb-2">
        <span className="font-bold">SHIPPING MARK:</span> {record.shippingMark}
      </p>

      <div className="mt-1">
        <SectionBar>BANK DETAILS OF BENEFICIARY</SectionBar>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 py-2">
        <Field label="BANK NAME" value={record.beneficiaryBankName} />
        <Field label="SWIFT CODE" value={record.beneficiarySwiftCode} />
        <Field label="BANK ADDRESS" value={record.beneficiaryBankAddress} />
        <Field label="BRANCH CODE" value={record.beneficiaryBranchCode} />
        <Field label="ACCOUNT NAME" value={record.beneficiaryAccountName} />
        <Field label="BRANCH NAME" value={record.beneficiaryBranchName} />
        <Field label="ACCOUNT NO" value={record.beneficiaryAccountNo} />
      </div>

      <p className="py-2 font-semibold text-red-600">
        **For dealing with LC only, we recommend you to ask your bank to channel L/C
        directly to our above bank in {record.countryOfOrigin || "Japan"}.
      </p>

      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th colSpan={5} className="bg-[#1e3a6e] p-1.5 text-center font-bold text-white">
              PRODUCT DESCRIPTION: USED/RECONDITION MOTOR VEHICLE
            </th>
          </tr>
          <tr className="bg-[#2c4d85] text-white">
            <th className="p-1.5 font-bold">SL</th>
            <th className="p-1.5 font-bold">STOCK NO.</th>
            <th className="p-1.5 font-bold">CAR BASIC INFORMATION</th>
            <th className="p-1.5 text-right font-bold">UNIT PRICE</th>
            <th className="p-1.5 text-right font-bold">FREIGHT</th>
            <th className="p-1.5 text-right font-bold">CNF PRICE</th>
          </tr>
        </thead>
        <tbody>
          {record.vehicles.map((v, i) => {
            const cnf = (Number(v.unitPrice) || 0) + (Number(v.freight) || 0);
            return (
              <tr key={v.id} className="border-b border-slate-200 align-top">
                <td className="p-1.5">{i + 1}.</td>
                <td className="p-1.5 font-semibold">{v.stockNo}</td>
                <td className="p-1.5">
                  <p>NAME: {v.name}</p>
                  <p>CHASSIS NO: {v.chassisNo}</p>
                  <p>YEAR: {v.year}</p>
                  <p>CC: {v.cc}</p>
                  <p>COLOR: {v.color}</p>
                  <p>HS CODE: {v.hsCode}</p>
                </td>
                <td className="p-1.5 text-right">
                  {record.currency} {Number(v.unitPrice || 0).toLocaleString()}
                </td>
                <td className="p-1.5 text-right">
                  {record.currency} {Number(v.freight || 0).toLocaleString()}
                </td>
                <td className="p-1.5 text-right font-semibold">
                  {record.currency} {cnf.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="bg-[#1e3a6e] text-white">
            <td colSpan={2} className="p-1.5 font-bold">
              TOTAL QUANTITY: {record.vehicles.length} UNITS
            </td>
            <td colSpan={2} className="p-1.5 text-right font-bold">
              TOTAL CNF PRICE:
            </td>
            <td className="p-1.5 text-right text-base font-bold">
              {record.currency} {totalCnf.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>

      <p className="mt-4">
        I declare that the information mentioned above is true and correct to the best
        of my knowledge.
      </p>
    </div>
  );
}
