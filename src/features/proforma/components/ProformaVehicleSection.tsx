import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProformaFormValues } from "@/features/proforma/schema/proformaSchema";

const columns: {
  key: keyof ProformaFormValues["vehicles"][number];
  label: string;
}[] = [
  { key: "stockNo", label: "Stock No." },
  { key: "name", label: "Name" },
  { key: "chassisNo", label: "Chassis No." },
  { key: "year", label: "Year" },
  { key: "cc", label: "CC" },
  { key: "color", label: "Color" },
  { key: "hsCode", label: "HS Code" },
  { key: "unitPrice", label: "Unit Price" },
  { key: "freight", label: "Freight" },
];

export default function ProformaVehicleSection() {
  const { control, formState } = useFormContext<ProformaFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name: "vehicles" });

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key} className="whitespace-nowrap">
                  {col.label}
                </TableHead>
              ))}
              <TableHead className="whitespace-nowrap">CNF Price</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <VehicleRow
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
              />
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
        onClick={() =>
          append({
            id: crypto.randomUUID(),
            stockNo: "",
            name: "",
            chassisNo: "",
            year: "",
            cc: "",
            color: "",
            hsCode: "",
            unitPrice: "",
            freight: "",
          })
        }
      >
        <Plus className="size-4" />
        Add Vehicle
      </Button>
    </div>
  );
}

function VehicleRow({ index, onRemove }: { index: number; onRemove: () => void }) {
  const { register, watch } = useFormContext<ProformaFormValues>();
  const unitPrice = Number(watch(`vehicles.${index}.unitPrice`)) || 0;
  const freight = Number(watch(`vehicles.${index}.freight`)) || 0;

  return (
    <TableRow>
      {columns.map((col) => (
        <TableCell key={col.key} className="p-1.5">
          <Input className="w-28" {...register(`vehicles.${index}.${col.key}` as const)} />
        </TableCell>
      ))}
      <TableCell className="p-1.5 text-sm font-medium">
        {(unitPrice + freight).toLocaleString()}
      </TableCell>
      <TableCell className="p-1.5">
        <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
