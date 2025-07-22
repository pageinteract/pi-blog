export const defaultLocale = "en" as const;
export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export const pathnames = {};
// Removed localePrefix as we're not using locale-based routing

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_URL
  ? `https://${process.env.WEBSITE_URL}`
  : `http://localhost:${port}`;
