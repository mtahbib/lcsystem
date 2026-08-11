import { Fragment, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormField from "@/components/common/FormField";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LCFormValues } from "@/features/lc/schema/lcSchema";

const columns: {
  key: keyof LCFormValues["vehicles"][number];
  label: string;
  type?: string;
}[] = [
  { key: "stockId", label: "Stock ID" },
  { key: "model", label: "Model" },
  { key: "year", label: "Year" },
  { key: "chassis", label: "Chassis" },
  { key: "cc", label: "CC" },
  { key: "color", label: "Color" },
  { key: "hsCode", label: "HS Code" },
  { key: "fob", label: "FOB" },
  { key: "freight", label: "Freight" },
  { key: "cfr", label: "CFR" },
  { key: "portOfLoading", label: "Port of Loading" },
  { key: "portOfDeparture", label: "Port of Departure" },
  { key: "dateOfDeparture", label: "Date of Departure", type: "date" },
  { key: "netWeight", label: "Net Weight" },
  { key: "grossWeight", label: "Gross Weight" },
];

const exportCertificateColumns: {
  key: keyof LCFormValues["vehicles"][number];
  label: string;
  type?: string;
}[] = [
  { key: "certificateNo", label: "Certificate No" },
  { key: "registrationNo", label: "Registration No" },
  { key: "regDate", label: "Reg. Date", type: "date" },
  { key: "firstRegDate", label: "First Reg. Date", type: "date" },
  { key: "vehicleType", label: "Type" },
  { key: "useType", label: "Use" },
  { key: "personalUse", label: "Personal Use" },
  { key: "workUse", label: "Work Use" },
  { key: "shapeOfCar", label: "Shape of Car" },
  { key: "make", label: "Make" },
  { key: "modelCode", label: "Model (code)" },
  { key: "capacity", label: "Capacity" },
  { key: "carryingCap", label: "Carrying Cap" },
  { key: "chassisModel", label: "Chassis Model" },
  { key: "engineModel", label: "Engine Model" },
  { key: "length", label: "Length" },
  { key: "width", label: "Width" },
  { key: "height", label: "Height" },
  { key: "ventilation", label: "Ventilation" },
  { key: "fuel", label: "Fuel" },
  { key: "ownerName", label: "Name of Owner" },
  { key: "ownerAddress", label: "Address of Owner" },
  { key: "userName", label: "Name of User" },
  { key: "userAddress", label: "Address of User" },
  { key: "localityOfUse", label: "Locality of Principal Abode of Use" },
  { key: "expiryDate", label: "Effective Date Till Expiry", type: "date" },
  { key: "originCertificateNo", label: "Certificate of Origin No" },
  { key: "engineNumber", label: "Engine Number" },
];

const emptyVehicle: Omit<LCFormValues["vehicles"][number], "id"> = {
  stockId: "",
  model: "",
  year: "",
  chassis: "",
  cc: "",
  color: "",
  hsCode: "",
  fob: "",
  freight: "",
  cfr: "",
  portOfLoading: "",
  portOfDeparture: "",
  dateOfDeparture: "",
  netWeight: "",
  grossWeight: "",
  certificateNo: "",
  registrationNo: "",
  regDate: "",
  firstRegDate: "",
  vehicleType: "",
  useType: "",
  personalUse: "",
  workUse: "",
  shapeOfCar: "",
  make: "",
  modelCode: "",
  capacity: "",
  carryingCap: "",
  chassisModel: "",
  engineModel: "",
  length: "",
  width: "",
  height: "",
  ventilation: "",
  fuel: "",
  ownerName: "",
  ownerAddress: "",
  userName: "",
  userAddress: "",
  localityOfUse: "",
  expiryDate: "",
  originCertificateNo: "",
  engineNumber: "",
};

export default function VehicleSection() {
  const { control, register, formState } = useFormContext<LCFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "vehicles" });
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              {columns.map((col) => (
                <TableHead key={col.key} className="whitespace-nowrap">
                  {col.label}
                </TableHead>
              ))}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <TableRow>
                  <TableCell className="p-1.5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleExpanded(field.id)}
                    >
                      {expanded.has(field.id) ? (
                        <ChevronDown className="size-4" />
                      ) : (
                        <ChevronRight className="size-4" />
                      )}
                    </Button>
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.key} className="p-1.5">
                      <Input
                        type={col.type}
                        className="w-28"
                        {...register(`vehicles.${index}.${col.key}` as const)}
                      />
                    </TableCell>
                  ))}
                  <TableCell className="p-1.5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
                {expanded.has(field.id) && (
                  <TableRow>
                    <TableCell colSpan={columns.length + 2} className="bg-slate-50 p-4">
                      <p className="mb-3 text-sm font-semibold">
                        Export Certificate Details — {field.stockId || "this vehicle"}
                      </p>
                      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-4">
                        {exportCertificateColumns.map((col) => (
                          <FormField key={col.key} label={col.label}>
                            <Input
                              type={col.type}
                              {...register(`vehicles.${index}.${col.key}` as const)}
                            />
                          </FormField>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {(formState.errors.vehicles?.root?.message ||
        (typeof formState.errors.vehicles?.message === "string" &&
          formState.errors.vehicles.message)) && (
        <p className="text-xs text-destructive">
          {formState.errors.vehicles?.root?.message ?? formState.errors.vehicles?.message}
        </p>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ id: crypto.randomUUID(), ...emptyVehicle })}
      >
        <Plus className="size-4" />
        Add Vehicle
      </Button>
    </div>
  );
}
