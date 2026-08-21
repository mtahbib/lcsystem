import type { LCRecord, ShipmentRecord, Vehicle } from "@/types/lc";
import PlainMultilineText from "@/components/common/PlainMultilineText";
import {
  buildNotifyParty,
  formatDateShort,
  withFallback,
} from "@/features/documents/templates/documentHelpers";
import { BL_LABEL_DEFAULTS, type BlLabelKey } from "@/features/lc/constants/billOfLadingLabels";

interface Props {
  lc: LCRecord;
  shipment: ShipmentRecord;
  vehicle: Vehicle;
  logo: string;
}

const BLUE = "text-[#1a3b8f]";

export default function BillOfLading({ lc, shipment, vehicle }: Props) {
  const notifyParty = buildNotifyParty(lc.customer.details, shipment.bankDetails);
  const quantityText = withFallback(vehicle.blQuantityText, "1 UNIT(S)");
  const goodsType = withFallback(vehicle.blGoodsType, "USED/RECONDITION VEHICLE");
  const quantityWords = withFallback(vehicle.blQuantityWords, "SAY: ONE (1) UNIT(S) ONLY");
  const L = (key: BlLabelKey) => withFallback(shipment[key], BL_LABEL_DEFAULTS[key]);

  return (
    <div className="mx-auto max-w-4xl bg-white p-4 font-mono text-[11px] text-black print:max-w-none">
      <div className="flex items-start justify-between">
        <p className={`text-lg font-bold ${BLUE}`}>{vehicle.stockId}</p>
        <p className="text-sm">
          <span className={`font-bold ${BLUE}`}>{L("blLabelForwardingAgent")}</span>{" "}
          <span className="font-bold">{shipment.forwardingAgent}</span>
        </p>
      </div>

      <table className="w-full table-fixed border-collapse [&_td]:align-top">
        <tbody>
          <tr>
            <td className="w-1/2 border border-black p-2">
              <p className={`font-bold ${BLUE}`}>{L("blLabelShipper")}</p>
              <div className="mt-1 font-bold">
                <PlainMultilineText text={lc.beneficiary.details} />
              </div>
            </td>
            <td className="w-1/2 p-2 align-top">
              <div className="flex items-start justify-between gap-2">
                <div className="border border-black p-2">
                  <p className={`font-bold ${BLUE}`}>{L("blLabelBlNo")}</p>
                  <p className="mt-1 text-base font-bold">{vehicle.blNo}</p>
                </div>
                <p className={`font-serif text-2xl font-bold italic ${BLUE}`}>
                  {shipment.carrierName}
                </p>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="border border-black p-2">
                  <p className={`font-bold ${BLUE}`}>{L("blLabelReferenceNo")}</p>
                  <p className="font-bold">{shipment.blReferenceNo}</p>
                </div>
                <div className="border border-black p-2">
                  <p className={`font-bold ${BLUE}`}>{L("blLabelCharterPartyDate")}</p>
                  <p>{formatDateShort(shipment.charterPartyDate)}</p>
                </div>
              </div>
              <h1 className="mt-4 text-center text-3xl font-bold">{L("blLabelTitle")}</h1>
            </td>
          </tr>

          <tr>
            <td className="border border-black p-2">
              <p className={`font-bold ${BLUE}`}>{L("blLabelConsignee")}</p>
              <div className="mt-1 font-bold">
                <PlainMultilineText text={shipment.consignee} />
              </div>
            </td>
            <td className="border border-black p-2 text-[10.5px] leading-snug">
              <p>{shipment.blTermsText}</p>
            </td>
          </tr>

          <tr>
            <td className="border border-black p-2" rowSpan={2}>
              <p className={`font-bold ${BLUE}`}>{L("blLabelNotifyParty")}</p>
              <div className="mt-1 font-bold">
                <PlainMultilineText text={notifyParty} />
              </div>
            </td>
            <td className="border border-black p-0">
              <table className="w-full table-fixed border-collapse [&_td]:align-top">
                <tbody>
                  <tr>
                    <td className="w-2/3 border-b border-r border-black p-2">
                      <p className={`font-bold ${BLUE}`}>
                        {L("blLabelFromMerchantRef")}
                      </p>
                    </td>
                    <td className="w-1/3 border-b border-black p-2">
                      <p className={`font-bold ${BLUE}`}>{L("blLabelPortOfLoading")}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-r border-black p-2">
                      <div className="grid grid-cols-2">
                        <p>
                          <span className={`font-bold ${BLUE}`}>{L("blLabelFirstVessel")}</span>
                        </p>
                        <p>
                          <span className={`font-bold ${BLUE}`}>{L("blLabelVoyNo")}</span>
                        </p>
                        <p className="font-bold">{shipment.vesselName}</p>
                        <p className="font-bold">{shipment.voyageNo}</p>
                      </div>
                    </td>
                    <td className="border-b border-black p-2 font-bold">
                      {vehicle.portOfLoading}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-r border-black p-2">
                      <p className={`font-bold ${BLUE}`}>{L("blLabelSecondVessel")}</p>
                      <p className={`font-bold ${BLUE}`}>{L("blLabelVoyNo")}</p>
                    </td>
                    <td className="border-b border-black p-2">
                      <p className={`font-bold ${BLUE}`}>{L("blLabelPortOfTranshipment")}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className="border border-black p-0">
              <table className="w-full table-fixed border-collapse [&_td]:align-top">
                <tbody>
                  <tr>
                    <td className="w-1/3 border-b border-r border-black p-2">
                      <p className={`font-bold ${BLUE}`}>{L("blLabelPortOfDischarge")}</p>
                      <p className="font-bold">{shipment.portOfDischarge}</p>
                    </td>
                    <td className="w-1/3 border-b border-r border-black p-2">
                      <p className={`font-bold ${BLUE}`}>
                        {L("blLabelTranshipmentTo")}
                      </p>
                    </td>
                    <td className="w-1/3 border-b border-black p-2">
                      <p className={`font-bold ${BLUE}`}>
                        {L("blLabelFinalDestination")}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td className="border border-black p-0" colSpan={2}>
              <table className="w-full table-fixed border-collapse [&_td]:align-top">
                <tbody>
                  <tr>
                    <td className="w-1/4 border-b border-r border-black p-2">
                      <p className={`font-bold ${BLUE}`}>{L("blLabelMarksNumbers")}</p>
                    </td>
                    <td className="w-2/5 border-b border-r border-black p-2">
                      <p className={`font-bold ${BLUE}`}>
                        {L("blLabelPkgsKind")}
                      </p>
                      <p className={`font-bold ${BLUE}`}>{L("blLabelNoOfUnits")}</p>
                    </td>
                    <td className="w-1/5 border-b border-r border-black p-2">
                      <p className={`font-bold ${BLUE}`}>{L("blLabelGrossWeightKgs")}</p>
                      <p className={`font-bold ${BLUE}`}>{L("blLabelSaidToWeigh")}</p>
                    </td>
                    <td className="w-1/5 border-b border-black p-2">
                      <p className={`font-bold ${BLUE}`}>{L("blLabelMeasurementM3")}</p>
                      <p className={`font-bold ${BLUE}`}>{L("blLabelSaidToMeasure")}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-r border-black p-2 align-top font-bold">
                      <PlainMultilineText text={shipment.shippingMarks} />
                    </td>
                    <td className="border-r border-black p-2 align-top">
                      <p className="font-bold">{quantityText}</p>
                      <p className="mt-1 font-bold">{goodsType}</p>
                      <p className="font-bold">{vehicle.model}</p>
                      <p>CHASSIS NO: {vehicle.chassis}</p>
                      <p>YEAR: {vehicle.year}</p>
                      <p>CC: {vehicle.cc}CC</p>
                      <p>HS CODE: {vehicle.hsCode}</p>
                      <p>ENGINE NO: {vehicle.engineNo}</p>
                      <p>L/C NUMBER: {lc.lc.lcNumber}</p>
                      <p>L/C DATE: {formatDateShort(lc.lc.issueDate)}</p>
                      <div className="mt-1">
                        <PlainMultilineText text={shipment.remarks} />
                      </div>
                      <div className="mt-3">
                        <PlainMultilineText text={shipment.freightAgentBlock} />
                      </div>
                    </td>
                    <td className="border-r border-black p-2 align-top">
                      <p className="font-bold">{L("blLabelKgs")}</p>
                      <p className="mt-1">{vehicle.grossWeight}</p>
                    </td>
                    <td className="p-2 align-top">
                      <p className="font-bold">{L("blLabelCbm")}</p>
                      <p className="mt-1">{vehicle.measurementCbm}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t border-black p-2" colSpan={4}>
                      <p className={`text-center font-bold ${BLUE}`}>
                        {shipment.freightTerms}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t border-black p-2" colSpan={4}>
                      <span className={`font-bold ${BLUE}`}>
                        {L("blLabelTotalPackagesWords")}
                      </span>{" "}
                      <span className="font-bold">{quantityWords}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr>
            <td className="border border-black p-0" colSpan={2}>
              <table className="w-full table-fixed border-collapse [&_td]:align-top">
                <tbody>
                  <tr>
                    {(
                      [
                        "blLabelFreightCharges",
                        "blLabelRevenueTons",
                        "blLabelRate",
                        "blLabelPer",
                        "blLabelPrepaid",
                        "blLabelCollect",
                      ] as const
                    ).map((key, i, arr) => (
                      <td
                        key={key}
                        className={`h-16 border-b border-black p-2 ${
                          i < arr.length - 1 ? "border-r" : ""
                        }`}
                      >
                        <p className={`font-bold ${BLUE}`}>{L(key)}</p>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="border-r border-black p-2" rowSpan={2}>
                      <p className={`font-bold ${BLUE}`}>{L("blLabelExRate")}</p>
                      <p className="mt-2 font-bold">@ {shipment.exRate}</p>
                    </td>
                    <td className="border-b border-black p-2" colSpan={5}>
                      <span className={`font-bold ${BLUE}`}>{L("blLabelDeclaredValue")}</span>{" "}
                      <span className="font-bold">{vehicle.declaredValue}</span>{" "}
                      <span>{shipment.blDeclaredValueClause}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/5 border-r border-black p-2">
                      <p className={`font-bold ${BLUE}`}>{L("blLabelFreightPrepaidAt")}</p>
                      <p className="mt-1 font-bold">{shipment.freightPrepaidAt}</p>
                    </td>
                    <td className="w-1/5 border-r border-black p-2">
                      <p className={`font-bold ${BLUE}`}>{L("blLabelFreightPayableAt")}</p>
                      <p className="mt-1 font-bold">{shipment.freightPayableAt}</p>
                    </td>
                    <td className="w-2/5 p-2" colSpan={3}>
                      <p className={`font-bold ${BLUE}`}>{L("blLabelPlaceDateIssue")}</p>
                      <p className="mt-1 font-bold">
                        {shipment.blIssuePlace} {formatDateShort(shipment.blIssueDate)}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t border-r border-black p-2">
                      <p className={`font-bold ${BLUE}`}>{L("blLabelTotalPrepaidYen")}</p>
                      <p className="mt-1 font-bold">{shipment.totalPrepaidInYen}</p>
                    </td>
                    <td className="border-t border-r border-black p-2" colSpan={2}>
                      <p className={`font-bold ${BLUE}`}>{L("blLabelNoOriginalBL")}</p>
                      <p className="mt-1 font-bold">{shipment.noOfOriginalBL}</p>
                    </td>
                    <td className="border-t border-black p-2" colSpan={3}>
                      <div className="font-bold">
                        <PlainMultilineText text={shipment.carrierSignatory} />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-2 flex items-end justify-between text-[10px] leading-snug">
        <p className="max-w-2xl">{shipment.blAcceptanceText}</p>
        <p className="shrink-0 font-bold">{shipment.formVersionNo}</p>
      </div>
    </div>
  );
}
