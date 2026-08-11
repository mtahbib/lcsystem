import type { LCRecord, ShipmentRecord, Vehicle } from "@/types/lc";
import DocumentLayout from "@/features/documents/templates/DocumentLayout";
import PlainMultilineText from "@/components/common/PlainMultilineText";
import { firstLine } from "@/features/lc/utils";

interface Props {
  lc: LCRecord;
  shipment: ShipmentRecord;
  vehicle: Vehicle;
  logo: string;
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border p-1.5">
      <p className="font-bold">{label}</p>
      <p>{value}</p>
    </div>
  );
}

export default function ExportCertificate({ lc, shipment, vehicle, logo }: Props) {
  return (
    <DocumentLayout lc={lc} logo={logo} title="EXPORT CERTIFICATE" bordered={false}>
      <p>No : {vehicle.certificateNo}</p>

      <div className="grid grid-cols-7 border">
        <Cell label="Registration No" value={vehicle.registrationNo} />
        <Cell label="Reg. Date" value={vehicle.regDate} />
        <Cell label="First Reg. Date" value={vehicle.firstRegDate} />
        <Cell label="Type" value={vehicle.vehicleType} />
        <Cell label="Use" value={vehicle.useType} />
        <Cell label="Personal Use" value={vehicle.personalUse} />
        <Cell label="Work Use" value={vehicle.workUse} />
      </div>

      <div className="grid grid-cols-6 border">
        <Cell label="Shape of Car" value={vehicle.shapeOfCar} />
        <Cell label="Make" value={vehicle.make} />
        <Cell label="Model" value={vehicle.modelCode} />
        <Cell label="Capacity" value={vehicle.capacity} />
        <Cell label="Carrying Cap" value={vehicle.carryingCap} />
        <Cell label="Weight" value={vehicle.netWeight} />
      </div>

      <div className="grid grid-cols-6 border">
        <Cell label="G/Weight" value={vehicle.grossWeight} />
        <Cell label="Chassis Model" value={vehicle.chassisModel} />
        <Cell label="Engine Model" value={vehicle.engineModel} />
        <Cell label="Length" value={vehicle.length} />
        <Cell label="Width" value={vehicle.width} />
        <Cell label="Height" value={vehicle.height} />
      </div>

      <div className="grid grid-cols-2 border">
        <Cell label="Ventilation" value={vehicle.ventilation} />
        <Cell label="Fuel" value={vehicle.fuel} />
      </div>

      <div className="border p-1.5">
        <p className="font-bold underline">NAME OF OWNER</p>
        <p>{vehicle.ownerName}</p>
      </div>
      <div className="border p-1.5">
        <p className="font-bold underline">ADDRESS OF OWNER</p>
        <p>{vehicle.ownerAddress}</p>
      </div>
      <div className="border p-1.5">
        <p className="font-bold underline">NAME OF USER</p>
        <p>{vehicle.userName || "***"}</p>
      </div>
      <div className="border p-1.5">
        <p className="font-bold underline">ADDRESS OF USER</p>
        <p>{vehicle.userAddress || "***"}</p>
      </div>
      <div className="border p-1.5">
        <p className="font-bold underline">LOCALITY OF PRINCIPAL ABODE OF USE</p>
        <p>{vehicle.localityOfUse || "***"}</p>
      </div>

      <div className="grid grid-cols-[110px_1fr] border">
        <div className="border-r p-1.5">
          <p className="font-bold">EFFECTIVE</p>
          <p className="font-bold">DATE TILL</p>
          <p className="font-bold">EXPIRY</p>
          <p className="mt-1 underline">{vehicle.expiryDate}</p>
        </div>
        <div className="p-1.5">
          <p className="font-bold">Remarks</p>
          <PlainMultilineText text={shipment.remarks} />
        </div>
      </div>

      <div className="flex justify-end">
        <div className="text-right">
          <p className="mt-6 border-t border-black pt-1 font-semibold">EXPORT MANAGER</p>
          <p className="font-semibold">{firstLine(lc.beneficiary.details)}</p>
        </div>
      </div>
    </DocumentLayout>
  );
}
