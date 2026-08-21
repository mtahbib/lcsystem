import { useSyncExternalStore } from "react";

const STORAGE_KEY = "lc-document-system:settings";

export const DEFAULT_LOGO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <circle cx="48" cy="48" r="46" fill="none" stroke="#0f172a" stroke-width="3"/>
      <circle cx="48" cy="58" r="18" fill="#dc2626"/>
      <text x="48" y="34" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#0f172a">LC</text>
    </svg>
  `);

interface Settings {
  logo: string;
  proformaLogo: string;
}

function readFromStorage(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<Settings>) : null;
    return {
      logo: parsed?.logo ?? DEFAULT_LOGO,
      proformaLogo: parsed?.proformaLogo ?? DEFAULT_LOGO,
    };
  } catch {
    return { logo: DEFAULT_LOGO, proformaLogo: DEFAULT_LOGO };
  }
}

let settings: Settings = readFromStorage();
const listeners = new Set<() => void>();

function emit() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return settings;
}

export function setLogo(logo: string) {
  settings = { ...settings, logo };
  emit();
}

export function resetLogo() {
  settings = { ...settings, logo: DEFAULT_LOGO };
  emit();
}

export function setProformaLogo(proformaLogo: string) {
  settings = { ...settings, proformaLogo };
  emit();
}

export function resetProformaLogo() {
  settings = { ...settings, proformaLogo: DEFAULT_LOGO };
  emit();
}

export function useSettings() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
