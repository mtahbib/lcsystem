import type { Vehicle } from "@/types/lc";
import { numberToWords } from "@/lib/numberToWords";

export function vehicleDescription(v: Vehicle) {
  return `${v.model}, YEAR: ${v.year}, HS CODE: ${v.hsCode}, COLOR: ${v.color}`;
}

export function sumAmount(vehicles: Vehicle[], key: "fob" | "freight" | "cfr") {
  return vehicles.reduce((total, v) => total + (Number(v[key]) || 0), 0);
}

export function amountInWords(amount: number, currency: string) {
  return `${currency} ${numberToWords(amount).toUpperCase()}`;
}

export function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function shippingAdviceDescription(v: Vehicle) {
  return `Year : ${v.year}, CC : ${v.cc}, HS Code : ${v.hsCode}, ENGINE NUMBER: ${v.engineNumber}`;
}

export function withFallback(text: string, fallback = "Not found") {
  return text.trim().length > 0 ? text : fallback;
}

export function parseCertifications(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [code, ...rest] = line.split("\t");
      return rest.length > 0
        ? { code: code.trim(), text: rest.join("\t").trim() }
        : { code: "", text: code.trim() };
    });
}

export function uniqueJoined(values: string[], separator = " & ") {
  return Array.from(new Set(values.map((v) => v.trim()).filter(Boolean))).join(separator);
}

export function formatDateShort(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
