const asNumber = (v: string | undefined, fallback: number) =>
  v !== undefined && !Number.isNaN(Number(v)) ? Number(v) : fallback;

export const env = Object.freeze({
  isProduction: process.env.NODE_ENV === "production",
  port: asNumber(process.env.PORT, 3000),
  apiMock: process.env.API_MOCK !== "false",
  mongoUri: process.env.MONGODB_URI ?? "mongodb://localhost:27017/house-booking",
});
