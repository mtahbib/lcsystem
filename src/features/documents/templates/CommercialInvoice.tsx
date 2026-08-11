import type { LCRecord, ShipmentRecord, Vehicle } from "@/types/lc";
import DocumentLayout from "@/features/documents/templates/DocumentLayout";
import PlainMultilineText from "@/components/common/PlainMultilineText";
import { numberToWords } from "@/lib/numberToWords";
import { formatDateShort } from "@/features/documents/templates/documentHelpers";

interface Props {
  lc: LCRecord;
  shipment: ShipmentRecord;
  vehicle: Vehicle;
  logo: string;
}

export default function CommercialInvoice({ lc, shipment, vehicle, logo }: Props) {
  const cfr = Number(vehicle.cfr) || 0;

  return (
    <DocumentLayout lc={lc} logo={logo} title="COMMERCIAL INVOICE" bordered={false}>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="font-bold underline">CUSTOMER DETAILS:</p>
          <PlainMultilineText text={lc.customer.details} />
        </div>
        <div className="grid grid-cols-[100px_1fr] gap-y-0.5">
          <p className="font-bold">INVOICE NO:</p>
          <p>{vehicle.stockId}</p>
          <p className="font-bold">DATE:</p>
          <p>{formatDateShort(shipment.invoiceDate)}</p>
          <p className="font-bold">LC NO:</p>
          <p>{lc.lc.lcNumber}</p>
          <p className="font-bold">DATE:</p>
          <p>{formatDateShort(lc.lc.issueDate)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-0.5">
          <p><span className="font-bold">METHOD OF DISPATCH:</span> {shipment.dispatchMethod}</p>
          <p><span className="font-bold">TYPE OF SHIPMENT:</span> {shipment.shipmentType}</p>
          <p><span className="font-bold">VESSEL NAME:</span> {shipment.vesselName}</p>
          <p><span className="font-bold">VOYAGE NO:</span> {shipment.voyageNo}</p>
          <p><span className="font-bold">DATE OF DEPARTURE:</span>{formatDateShort(vehicle.dateOfDeparture)}</p>
        </div>
        <div className="space-y-0.5">
          <p>
            <span className="font-bold">TERMS/METHOD OF PAYMENT:</span> {shipment.termsOfPayment}
          </p>
          <p><span className="font-bold">COUNTRY OF ORIGIN:</span> {shipment.countryOfOrigin}</p>
          <p><span className="font-bold">PORT OF LOADING:</span> {vehicle.portOfLoading}</p>
          <p><span className="font-bold">PORT OF DISCHARGE:</span> {shipment.portOfDischarge}</p>
          <p><span className="font-bold">FINAL DESTINATION:</span> {shipment.destination}</p>
        </div>
      </div>

      <table className="w-full border-collapse border border-black text-left">
        <thead>
          <tr>
            <th className="border border-black p-1.5 text-center font-bold" colSpan={5}>
              USED/RECONDITION MOTOR VEHICLE(S)
            </th>
          </tr>
          <tr>
            <th className="border border-black p-1.5 text-center font-bold">DESCRIPTION OF GOODS</th>
            <th className="border border-black p-1.5 text-center font-bold">QTY</th>
            <th className="border border-black p-1.5 text-center font-bold">FOB</th>
            <th className="border border-black p-1.5 text-center font-bold">FREIGHT</th>
            <th className="border border-black p-1.5 text-center font-bold">CFR PRICE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-1.5 align-top">
              <p>NAME: {vehicle.model}</p>
              <p>YEAR: {vehicle.year}</p>
              <p>CHASSIS NO: {vehicle.chassis}</p>
              <p>CC:{vehicle.cc}</p>
              <p>COLOR: {vehicle.color}</p>
              <p>H.S CODE: {vehicle.hsCode}</p>
            </td>
            <td className="border border-black p-1.5 text-center align-top">1</td>
            <td className="border border-black p-1.5 text-center align-top">
              {lc.lc.currency} {vehicle.fob}
            </td>
            <td className="border border-black p-1.5 text-center align-top">
              {lc.lc.currency} {vehicle.freight}
            </td>
            <td className="border border-black p-1.5 text-center align-top">
              {lc.lc.currency} {vehicle.cfr}
            </td>
          </tr>
          <tr>
            <td className="border border-black p-1.5 font-bold" colSpan={2}>
              IN WORDS: {numberToWords(cfr).toUpperCase()}
            </td>
            <td className="border border-black p-1.5"></td>
            <td className="border border-black p-1.5 text-center font-bold">TOTAL CFR</td>
            <td className="border border-black p-1.5 text-center font-bold">
              {lc.lc.currency} {vehicle.cfr}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="font-bold underline">REMARKS:</p>
          <PlainMultilineText text={shipment.remarks} />
        </div>
        <div>
          <p className="font-bold underline">ADDITIONAL INFORMATION:</p>
          <PlainMultilineText text={shipment.additionalInfo} />
        </div>
      </div>

      <div className="flex justify-end">
        <p className="font-bold underline">SIGNATURE:</p>
      </div>
    </DocumentLayout>
  );
}
