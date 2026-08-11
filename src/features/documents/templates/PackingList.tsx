import type { LCRecord, ShipmentRecord, Vehicle } from "@/types/lc";
import DocumentLayout from "@/features/documents/templates/DocumentLayout";
import PlainMultilineText from "@/components/common/PlainMultilineText";
import { firstLine } from "@/features/lc/utils";
import { formatDate, vehicleDescription } from "@/features/documents/templates/documentHelpers";

interface Props {
  lc: LCRecord;
  shipment: ShipmentRecord;
  vehicle: Vehicle;
  logo: string;
}

export default function PackingList({ lc, shipment, vehicle, logo }: Props) {
  return (
    <DocumentLayout lc={lc} logo={logo} title="PACKING LIST">
      <div className="grid grid-cols-2 border">
        <div className="border-r p-2">
          <p className="font-bold underline">CUSTOMER DETAILS:</p>
          <PlainMultilineText text={lc.customer.details} />
        </div>
        <div className="p-2">
          <p>Invoice No: {vehicle.stockId}</p>
          <p>Invoice Date: {formatDate(shipment.invoiceDate)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 border">
        <div className="border-r p-2">
          <p className="font-semibold">Method of Dispatch</p>
          <p>{shipment.dispatchMethod}</p>
        </div>
        <div className="border-r p-2">
          <p className="font-semibold">Type of Shipment</p>
          <p>{shipment.shipmentType}</p>
        </div>
        <div className="p-2">
          <p className="font-semibold">TT/LC No &amp; Date</p>
          <p>{lc.lc.lcNumber} {formatDate(lc.lc.issueDate)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 border">
        <div className="border-r p-2">
          <p className="font-semibold">Vessel</p>
          <p>{shipment.vesselName}</p>
        </div>
        <div className="border-r p-2">
          <p className="font-semibold">Voyage No</p>
          <p>{shipment.voyageNo}</p>
        </div>
        <div className="p-2">
          <p className="font-semibold">Term/Method of Payment</p>
          <p>{shipment.termsOfPayment}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 border">
        <div className="border-r p-2">
          <p className="font-semibold">Country of Origin</p>
          <p>{shipment.countryOfOrigin}</p>
        </div>
        <div className="border-r p-2">
          <p className="font-semibold">Port of Loading</p>
          <p>{vehicle.portOfLoading}</p>
        </div>
        <div className="p-2">
          <p className="font-semibold">Port of Discharge</p>
          <p>{shipment.portOfDischarge}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 border">
        <div className="border-r p-2">
          <p className="font-semibold">Final Destination</p>
          <p>{shipment.destination}</p>
        </div>
        <div className="p-2">
          <p className="font-semibold">Date of Departure</p>
          <p>{formatDate(vehicle.dateOfDeparture)}</p>
        </div>
      </div>

      <p className="text-center font-semibold">USED/RECONDITIONED VEHICLES</p>

      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-slate-100">
            <th className="border p-1.5">Stock ID</th>
            <th className="border p-1.5">Chassis No</th>
            <th className="border p-1.5">Description of Goods</th>
            <th className="border p-1.5">Qty</th>
            <th className="border p-1.5">Net Weight</th>
            <th className="border p-1.5">Gross Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-1.5">{vehicle.stockId}</td>
            <td className="border p-1.5">{vehicle.chassis}</td>
            <td className="border p-1.5">{vehicleDescription(vehicle)}</td>
            <td className="border p-1.5">1</td>
            <td className="border p-1.5">{vehicle.netWeight}</td>
            <td className="border p-1.5">{vehicle.grossWeight}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="bg-slate-100 font-semibold">
            <td className="border p-1.5" colSpan={3}>
              Total
            </td>
            <td className="border p-1.5">1</td>
            <td className="border p-1.5">{vehicle.netWeight}</td>
            <td className="border p-1.5">{vehicle.grossWeight}</td>
          </tr>
        </tfoot>
      </table>

      <div className="grid grid-cols-2 border">
        <div className="border-r p-2">
          <p className="font-semibold">Additional Information</p>
          <PlainMultilineText text={shipment.additionalInfo} />
        </div>
        <div className="p-2">
          <p className="font-semibold">Remarks</p>
          <PlainMultilineText text={shipment.remarks} />
        </div>
      </div>

      <div className="border p-2">
        <p className="font-semibold">Signature</p>
        <p className="mt-6">{shipment.exportManager}</p>
        <p>{firstLine(lc.beneficiary.details)}</p>
      </div>
    </DocumentLayout>
  );
}
