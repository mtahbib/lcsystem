export function firstLine(details: string | undefined | null) {
  return (details ?? "").split("\n").find((line) => line.trim().length > 0) ?? "";
}
