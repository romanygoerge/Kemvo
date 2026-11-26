/**
 * Canonical base URL for the Kemvo Studio website.
 * Falls back to the primary production domain configured on Vercel.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.kemvo.online"
).replace(/\/+$/, "");
