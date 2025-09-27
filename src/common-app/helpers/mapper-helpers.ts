// Safe string getter
export const getString = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

// Safe number getter (also parses numeric strings)
export const getNumber = (v: unknown, fallback = 0): number =>
  typeof v === "number"
    ? v
    : (typeof v === "string" && !Number.isNaN(Number(v)) ? Number(v) : fallback);

// Safe ISO date converter
export const toIso = (d: unknown, fallback = ""): string => {
  if (d instanceof Date) return d.toISOString();
  if (typeof d === "string") {
    const t = Date.parse(d);
    return Number.isNaN(t) ? fallback : new Date(t).toISOString();
  }
  return fallback;
};
