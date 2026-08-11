import { useSyncExternalStore } from "react";
import type { LCRecord } from "@/types/lc";

const STORAGE_KEY = "lc-document-system:lc-records";

function readFromStorage(): LCRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LCRecord[]) : [];
  } catch {
    return [];
  }
}

let records: LCRecord[] = readFromStorage();
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

export function addLC(record: Omit<LCRecord, "id" | "createdAt" | "updatedAt">) {
  const now = new Date().toISOString();
  const newRecord: LCRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  records = [newRecord, ...records];
  emit();
  return newRecord;
}

export function updateLC(id: string, record: Omit<LCRecord, "id" | "createdAt" | "updatedAt">) {
  records = records.map((r) =>
    r.id === id ? { ...record, id, createdAt: r.createdAt, updatedAt: new Date().toISOString() } : r
  );
  emit();
}

export function deleteLC(id: string) {
  records = records.filter((r) => r.id !== id);
  emit();
}

export function duplicateLC(id: string) {
  const source = records.find((r) => r.id === id);
  if (!source) return;
  const now = new Date().toISOString();
  const copy: LCRecord = {
    ...source,
    id: crypto.randomUUID(),
    lc: { ...source.lc, lcNumber: `${source.lc.lcNumber}-COPY` },
    createdAt: now,
    updatedAt: now,
  };
  records = [copy, ...records];
  emit();
  return copy;
}

export function getLCById(id: string) {
  return records.find((r) => r.id === id);
}

export function getLCByNumber(lcNumber: string) {
  const q = lcNumber.trim().toLowerCase();
  if (!q) return undefined;
  return records.find((r) => r.lc.lcNumber.trim().toLowerCase() === q);
}

export function useLCRecords() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
