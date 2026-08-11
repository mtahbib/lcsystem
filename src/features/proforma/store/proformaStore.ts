import { useSyncExternalStore } from "react";
import type { ProformaInvoiceRecord } from "@/types/proforma";

const STORAGE_KEY = "lc-document-system:proforma-invoices";

function readFromStorage(): ProformaInvoiceRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProformaInvoiceRecord[]) : [];
  } catch {
    return [];
  }
}

let records: ProformaInvoiceRecord[] = readFromStorage();
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

export function addProformaInvoice(
  record: Omit<ProformaInvoiceRecord, "id" | "createdAt" | "updatedAt">
) {
  const now = new Date().toISOString();
  const newRecord: ProformaInvoiceRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  records = [newRecord, ...records];
  emit();
  return newRecord;
}

export function updateProformaInvoice(
  id: string,
  record: Omit<ProformaInvoiceRecord, "id" | "createdAt" | "updatedAt">
) {
  records = records.map((r) =>
    r.id === id
      ? { ...record, id, createdAt: r.createdAt, updatedAt: new Date().toISOString() }
      : r
  );
  emit();
}

export function deleteProformaInvoice(id: string) {
  records = records.filter((r) => r.id !== id);
  emit();
}

export function getProformaInvoiceById(id: string) {
  return records.find((r) => r.id === id);
}

export function useProformaInvoices() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
