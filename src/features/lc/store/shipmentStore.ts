import { useSyncExternalStore } from "react";
import type { ShipmentRecord } from "@/types/lc";

const STORAGE_KEY = "lc-document-system:shipment-records";

function readFromStorage(): ShipmentRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ShipmentRecord[]) : [];
  } catch {
    return [];
  }
}

let records: ShipmentRecord[] = readFromStorage();
const listeners = new Set<() => void>();

function emit() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return records;
}

export function addShipment(
  lcId: string,
  record: Omit<ShipmentRecord, "id" | "lcId" | "createdAt" | "updatedAt">
) {
  const now = new Date().toISOString();
  const newRecord: ShipmentRecord = {
    ...record,
    id: crypto.randomUUID(),
    lcId,
    createdAt: now,
    updatedAt: now,
  };
  records = [newRecord, ...records];
  emit();
  return newRecord;
}

export function updateShipment(
  id: string,
  record: Omit<ShipmentRecord, "id" | "lcId" | "createdAt" | "updatedAt">
) {
  records = records.map((r) =>
    r.id === id ? { ...record, id, lcId: r.lcId, createdAt: r.createdAt, updatedAt: new Date().toISOString() } : r
  );
  emit();
}

export function getShipmentById(id: string) {
  return records.find((r) => r.id === id);
}

export function getShipmentsForLC(lcId: string) {
  return records.filter((r) => r.lcId === lcId);
}

export function useShipmentRecords() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
