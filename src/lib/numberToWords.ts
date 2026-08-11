const ones = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];
const tens = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
];

function chunkToWords(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ones[n];
  if (n < 100) return `${tens[Math.floor(n / 10)]}${n % 10 ? " " + ones[n % 10] : ""}`;
  return `${ones[Math.floor(n / 100)]} Hundred${n % 100 ? " " + chunkToWords(n % 100) : ""}`;
}

export function numberToWords(value: number): string {
  const integerPart = Math.floor(Math.abs(value));
  if (integerPart === 0) return "Zero";

  const groups = ["", "Thousand", "Million", "Billion"];
  let remaining = integerPart;
  const parts: string[] = [];
  let groupIndex = 0;

  while (remaining > 0) {
    const chunk = remaining % 1000;
    if (chunk > 0) {
      parts.unshift(`${chunkToWords(chunk)}${groups[groupIndex] ? " " + groups[groupIndex] : ""}`);
    }
    remaining = Math.floor(remaining / 1000);
    groupIndex += 1;
  }

  return parts.join(" ").trim();
}
