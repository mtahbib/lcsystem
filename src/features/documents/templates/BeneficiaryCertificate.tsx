import type { LCRecord, ShipmentRecord, Vehicle } from "@/types/lc";
import DocumentLayout from "@/features/documents/templates/DocumentLayout";
import PlainMultilineText from "@/components/common/PlainMultilineText";
import { firstLine } from "@/features/lc/utils";
import {
  formatDate,
  formatDateShort,
  parseCertifications,
  uniqueJoined,
} from "@/features/documents/templates/documentHelpers";

interface Props {
  lc: LCRecord;
  shipment: ShipmentRecord;
  vehicles: Vehicle[];
  logo: string;
}

export default function BeneficiaryCertificate({
  lc,
  shipment,
  vehicles,
  logo,
}: Props) {
  const certifications = parseCertifications(shipment.certifications);
  const portsOfLoading = uniqueJoined(vehicles.map((v) => v.portOfLoading));
  const datesOfDeparture = uniqueJoined(
    vehicles.map((v) => formatDateShort(v.dateOfDeparture))
  );

  return (
    <DocumentLayout lc={lc} logo={logo} title="CERTIFICATE">
      <div className="border p-2">
        <p className="font-bold underline">CUSTOMER DETAILS:</p>
        <PlainMultilineText text={lc.customer.details} />
      </div>

      <div className="grid grid-cols-2 border">
        <div className="border-r p-2">
          <p className="font-semibold">Date</p>
          <p>{formatDate(shipment.invoiceDate)}</p>
        </div>
        <div className="p-2">
          <p className="font-semibold">TT/LC No &amp; Date</p>
          <p>{lc.lc.lcNumber} {formatDate(lc.lc.issueDate)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 border">
        <div className="border-r p-2 space-y-0.5">
          <p><span className="font-semibold">Method of Dispatch:</span> {shipment.dispatchMethod}</p>
          <p><span className="font-semibold">Type of Shipment:</span> {shipment.shipmentType}</p>
          <p><span className="font-semibold">Vessel Name:</span> {shipment.vesselName}</p>
          <p><span className="font-semibold">Voyage No:</span> {shipment.voyageNo}</p>
          <p><span className="font-semibold">Departure:</span> {datesOfDeparture}</p>
        </div>
        <div className="p-2 space-y-0.5">
          <p><span className="font-semibold">Terms/Method of Payment:</span> {shipment.termsOfPayment}</p>
          <p><span className="font-semibold">Country of Origin:</span> {shipment.countryOfOrigin}</p>
          <p><span className="font-semibold">Port of Loading:</span> {portsOfLoading}</p>
          <p><span className="font-semibold">Port of Discharge:</span> {shipment.portOfDischarge}</p>
          <p><span className="font-semibold">Final Destination:</span> {shipment.destination}</p>
        </div>
      </div>

      {certifications.length > 0 && (
        <table className="w-full border-collapse border text-left">
          <tbody>
            {certifications.map((c, index) => (
              <tr key={index}>
                {c.code && (
                  <td className="border p-1.5 align-top font-semibold whitespace-nowrap">
                    {c.code}
                  </td>
                )}
                <td className="border p-1.5 align-top">{c.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="border">
        <p className="border-b bg-slate-100 p-1.5 text-center font-semibold">
          DESCRIPTION OF GOODS: USED/RECONDITION MOTOR VEHICLE(S)
        </p>
        <div className="divide-y">
          {vehicles.map((v, index) => (
            <p key={v.id} className="p-1.5">
              {index + 1}. NAME: {v.model}, YEAR: {v.year}, CHASSIS NO: {v.chassis}, CC:{v.cc},
              COLOR: {v.color}, H.S CODE: {v.hsCode}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 border">
        <div className="border-r p-2">
          <p className="font-semibold">Remarks</p>
          <PlainMultilineText text={shipment.remarks} />
        </div>
        <div className="p-2">
          <p className="font-semibold">Additional Information</p>
          <PlainMultilineText text={shipment.additionalInfo} />
        </div>
      </div>

      <div className="flex justify-end">
        <div className="text-right">
          <p className="font-semibold underline">Signature:</p>
          <p className="mt-6 font-semibold">{shipment.exportManager}</p>
          <p className="font-semibold">{firstLine(lc.beneficiary.details)}</p>
        </div>
      </div>
    </DocumentLayout>
  );
}
