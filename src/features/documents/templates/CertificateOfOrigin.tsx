import type { LCRecord, ShipmentRecord, Vehicle } from "@/types/lc";
import PlainMultilineText from "@/components/common/PlainMultilineText";
import { formatDate } from "@/features/documents/templates/documentHelpers";

interface Props {
  lc: LCRecord;
  shipment: ShipmentRecord;
  vehicle: Vehicle;
  logo: string;
}

export default function CertificateOfOrigin({ lc, shipment, vehicle }: Props) {
  return (
    <table className="mx-auto w-full max-w-3xl table-fixed border-collapse border border-black bg-white text-[12px] text-black [&_td]:border [&_td]:border-black [&_td]:p-2 [&_td]:align-top print:max-w-none">
      <tbody>
        <tr>
          <td className="w-1/2">
            <p className="font-semibold">1. Exporter (Name, address, country)</p>
            <div className="mt-2 font-semibold">
              <PlainMultilineText text={lc.beneficiary.details} />
            </div>
          </td>
          <td className="w-1/2 text-center">
            <h1 className="font-serif text-2xl">CERTIFICATE OF ORIGIN</h1>
            <p className="mt-2 font-semibold">issued by</p>
            <div className="font-semibold">
              <PlainMultilineText
                text={shipment.issuedBy
                  .split("\n")
                  .filter((l) => l.trim() && !/^issued by$/i.test(l.trim()))
                  .join("\n")}
              />
            </div>
          </td>
        </tr>

        <tr>
          <td rowSpan={3}>
            <p className="font-semibold">2. Consignee (Name, address, country)</p>
            <div className="mt-2 font-semibold">
              <PlainMultilineText text={shipment.consignee} />
            </div>
          </td>
          <td>
            <p className="font-semibold">* Print ORIGINAL or COPY</p>
            <p className="text-center font-semibold">ORIGINAL</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className="font-semibold">3. No. and date of Invoice</p>
            <p className="mt-1">{vehicle.stockId}</p>
            <p>{formatDate(shipment.invoiceDate)}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p className="font-semibold">4. Country of Origin</p>
            <p className="mt-2 text-center font-semibold">{shipment.countryOfOrigin}</p>
          </td>
        </tr>

        <tr>
          <td>
            <p className="font-semibold">5. Transport details</p>
            <div className="mt-2 grid grid-cols-[90px_1fr] gap-y-1">
              <p className="font-semibold">From:</p>
              <p>{vehicle.portOfLoading}</p>
              <p className="font-semibold">To:</p>
              <p>{shipment.portOfDischarge}</p>
              <p className="font-semibold">On or about:</p>
              <p>{formatDate(vehicle.dateOfDeparture)}</p>
              <p className="font-semibold">By:</p>
              <p>{shipment.vesselName}</p>
            </div>
          </td>
          <td>
            <p className="font-semibold">6. Remarks</p>
            <div className="mt-1">
              <PlainMultilineText text={shipment.remarks} />
            </div>
          </td>
        </tr>

        <tr>
          <td colSpan={2}>
            <div className="flex items-stretch">
              <div className="flex-1">
                <p className="font-semibold">
                  7. Marks, numbers, number and kind of packages; description of goods
                </p>
                <p className="mt-3 text-center font-semibold">USED MOTOR VEHICLES</p>
                <p className="text-center font-semibold">
                  MADE IN {shipment.countryOfOrigin}
                </p>

                <div className="mt-4 grid grid-cols-[1fr_1fr_1fr] gap-x-4">
                  <p className="font-semibold">{shipment.shippingMarks}</p>
                  <p className="font-semibold">{vehicle.make}</p>
                  <p className="font-semibold">{vehicle.model}</p>
                </div>
                <div className="mt-1 grid grid-cols-[1fr_1fr_1fr] gap-x-4">
                  <p />
                  <p className="font-semibold">CHASSIS NO:</p>
                  <p className="font-semibold">{vehicle.chassis}</p>
                </div>
              </div>
              <div className="w-[140px] shrink-0 border-l border-black pl-2">
                <p className="font-semibold">8. Quantity</p>
                <p className="mt-2">1 UNIT(S)</p>
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <p className="font-semibold">9. Declaration by the Exporter</p>
            <p className="mt-1 text-[11px]">
              The undersigned, as an authorized signatory, hereby declares that the
              above-mentioned goods were produced or manufactured in the country shown
              in box 4.
            </p>

            <p className="mt-6">Place and Date: ________________________</p>

            <p className="mt-8">(Signature)</p>
            <p className="mt-6 border-t border-black pt-1 text-center font-semibold">
              (Name)
            </p>
            <p className="text-center font-semibold">{shipment.exportManager}</p>
          </td>
          <td>
            <p className="font-semibold">10. Certification</p>
            <p className="mt-1 text-[11px]">
              The undersigned hereby certifies, on the basis of relative invoice and
              other supporting documents, that the above-mentioned goods originate in
              the country shown in box 4 to the best of its knowledge and belief.
            </p>

            <div className="mt-8 h-20" />

            <p className="text-right text-[11px]">
              (No., Date, Signature and Stamp of Certifying Authority)
            </p>
            <div className="mt-2 flex items-center justify-between border-t border-black pt-1">
              <p className="font-semibold">Certificate No.</p>
              <p className="text-lg font-bold">{vehicle.originCertificateNo}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
