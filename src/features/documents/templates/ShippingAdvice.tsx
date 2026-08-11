import type { LCRecord, ShipmentRecord, Vehicle } from "@/types/lc";
import DocumentLayout from "@/features/documents/templates/DocumentLayout";
import PlainMultilineText from "@/components/common/PlainMultilineText";
import { firstLine } from "@/features/lc/utils";
import {
  formatDate,
  shippingAdviceDescription,
  sumAmount,
  uniqueJoined,
  withFallback,
} from "@/features/documents/templates/documentHelpers";

export type ShippingAdviceRecipient = "insurance" | "customer" | "bank";

interface Props {
  lc: LCRecord;
  shipment: ShipmentRecord;
  vehicles: Vehicle[];
  logo: string;
  recipient: ShippingAdviceRecipient;
}

export default function ShippingAdvice({
  lc,
  shipment,
  vehicles,
  logo,
  recipient,
}: Props) {
  const portsOfLoading = uniqueJoined(vehicles.map((v) => v.portOfLoading), ", ");
  const datesOfDeparture = uniqueJoined(vehicles.map((v) => v.dateOfDeparture), ", ");
  const totalValue = sumAmount(vehicles, "cfr");

  const primary =
    recipient === "insurance"
      ? { label: "Insurance Details", text: shipment.insuranceDetails }
      : recipient === "bank"
        ? { label: "Bank Details", text: shipment.bankDetails }
        : { label: "Customer Details", text: lc.customer.details };

  const secondary =
    recipient === "customer"
      ? { label: "Bank Details", text: shipment.bankDetails }
      : { label: "Customer Details", text: lc.customer.details };

  return (
    <DocumentLayout lc={lc} logo={logo} title="SHIPPING ADVICE">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="font-semibold">{primary.label}</p>
          <PlainMultilineText text={primary.text} />
        </div>
        <div>
          <p className="font-semibold">{secondary.label}</p>
          <PlainMultilineText text={secondary.text} />
          <p className="mt-2 font-semibold">Date</p>
          <p>{formatDate(shipment.invoiceDate)}</p>
          <p className="mt-2 font-semibold">Cover Note No</p>
          <p>
            {shipment.coverNoteNo}, DTD {formatDate(shipment.coverNoteDate)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <div>
            <p className="font-semibold">Method of Dispatch</p>
            <p>{shipment.dispatchMethod}</p>
          </div>
          <div>
            <p className="font-semibold">Vessel</p>
            <p>{shipment.vesselName}</p>
          </div>
          <div>
            <p className="font-semibold">Port of Loading</p>
            <p>{portsOfLoading}</p>
          </div>
          <div>
            <p className="font-semibold">Port of Discharge</p>
            <p>{shipment.portOfDischarge}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <p className="font-semibold">Type of Shipment</p>
            <p>{shipment.shipmentType}</p>
          </div>
          <div>
            <p className="font-semibold">Voyage No</p>
            <p>{shipment.voyageNo}</p>
          </div>
          <div>
            <p className="font-semibold">Date of Departure</p>
            <p>{datesOfDeparture}</p>
          </div>
          <div>
            <p className="font-semibold">Date of Arrival</p>
            <p>{shipment.arrivalDate}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <p className="font-semibold">Letter of Credit No &amp; Date</p>
            <p>{lc.lc.lcNumber}</p>
            <p>{formatDate(lc.lc.issueDate)}</p>
          </div>
          <div>
            <p className="font-semibold">Term/ Method of Payment</p>
            <p>{shipment.termsOfPayment}</p>
          </div>
          <div>
            <p className="font-semibold">Country of Origin</p>
            <p>{shipment.countryOfOrigin}</p>
          </div>
          <div>
            <p className="font-semibold">Value</p>
            <p>
              {lc.lc.currency} {totalValue}
            </p>
          </div>
        </div>
      </div>

      <p className="text-center font-semibold">USED/RECONDITIONED VEHICLES</p>

      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-slate-100">
            <th className="border p-1.5">Invoice No</th>
            <th className="border p-1.5">Item Name</th>
            <th className="border p-1.5">Chassis No</th>
            <th className="border p-1.5">Description of Goods</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id}>
              <td className="border p-1.5">{v.stockId}</td>
              <td className="border p-1.5">{v.model}</td>
              <td className="border p-1.5">{v.chassis}</td>
              <td className="border p-1.5">{shippingAdviceDescription(v)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-slate-100 font-semibold">
            <td className="border p-1.5" colSpan={3}>
              Total
            </td>
            <td className="border p-1.5">{vehicles.length} UNIT(S)</td>
          </tr>
        </tfoot>
      </table>

      <div className="grid grid-cols-2 border">
        <div className="border-r p-2">
          <p className="font-semibold">Additional Information</p>
          <PlainMultilineText text={withFallback(shipment.additionalInfo)} />
        </div>
        <div className="p-2">
          <p className="font-semibold">Remarks</p>
          <PlainMultilineText text={shipment.remarks} />
        </div>
      </div>

      <div className="grid grid-cols-2 border">
        <div className="border-r p-2">
          <p className="font-semibold">Other Remarks</p>
          <PlainMultilineText text={withFallback(shipment.otherRemarks)} />
        </div>
        <div className="p-2 text-right">
          <p className="font-semibold">Signature</p>
          <p className="mt-6">{shipment.exportManager}</p>
          <p>{firstLine(lc.beneficiary.details)}</p>
        </div>
      </div>
    </DocumentLayout>
  );
}
