// app/lib/utils.ts

export function formatCompactNumber(number: number | undefined | null): string {
  if (number === null || number === undefined) {
    return "0";
  }

  // Jika angka di bawah 1000, tampilkan apa adanya.
  if (number < 1000) {
    return String(number);
  }

  // Gunakan API Intl.NumberFormat untuk format ringkas
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1, // Maksimal 1 angka di belakang koma
  });

  return formatter.format(number);
}
