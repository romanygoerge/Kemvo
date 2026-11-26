export interface AttributionData {
  source: string;
  landingPage: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  fbclid: string | null;
  fbp: string | null;
  fbc: string | null;
}

const STORAGE_KEY = "kemvo_attribution_v1";
const COOKIE_NAME = "kemvo_attr";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

interface StoredAttribution {
  data: AttributionData;
  updatedAt: number;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

function inferSource(params: {
  utmSource: string | null;
  utmMedium: string | null;
  fbclid: string | null;
  gclid: string | null;
  referrer: string | null;
}): string {
  const utm = params.utmSource?.toLowerCase() || "";
  if (
    params.fbclid ||
    ["facebook", "fb", "ig", "instagram", "meta", "meta_ads"].includes(utm)
  ) {
    return "meta_ads";
  }
  if (params.gclid || utm === "google" || utm === "google_ads") {
    return params.utmMedium?.toLowerCase() === "organic"
      ? "google_organic"
      : "google_ads";
  }
  if (params.utmSource) {
    return params.utmSource.slice(0, 80);
  }
  if (params.referrer) {
    try {
      const refHost = new URL(params.referrer).hostname.toLowerCase();
      if (refHost.includes("google.")) return "google_organic";
      if (refHost.includes("facebook.") || refHost.includes("instagram.")) {
        return "meta_social";
      }
      if (!refHost.includes("kemvo.online") && !refHost.includes("localhost")) {
        return `referral:${refHost}`.slice(0, 80);
      }
    } catch {
      // Ignore malformed referrer
    }
  }
  return "direct";
}

function loadStoredAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredAttribution;
      if (parsed?.data && Date.now() - parsed.updatedAt < TTL_MS) {
        return parsed.data;
      }
    }
  } catch {
    // Ignore storage read errors
  }

  try {
    const cookieVal = readCookie(COOKIE_NAME);
    if (cookieVal) {
      const parsed = JSON.parse(cookieVal) as AttributionData;
      if (parsed && typeof parsed.source === "string") {
        return parsed;
      }
    }
  } catch {
    // Ignore cookie parse errors
  }

  return null;
}

function persistAttribution(data: AttributionData) {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredAttribution = { data, updatedAt: Date.now() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota/private mode errors
  }
  try {
    writeCookie(COOKIE_NAME, JSON.stringify(data), 30 * 24 * 60 * 60);
  } catch {
    // Ignore cookie write errors
  }
}

/**
 * Captures UTM parameters, click IDs (fbclid), Meta cookies (_fbp/_fbc), landing page,
 * and external referrer while preserving first-touch landing context across navigation.
 */
export function captureAttribution(): AttributionData | null {
  if (typeof window === "undefined") return null;

  const existing = loadStoredAttribution();
  const searchParams = new URLSearchParams(window.location.search);

  const urlUtmSource = searchParams.get("utm_source")?.trim() || null;
  const urlUtmMedium = searchParams.get("utm_medium")?.trim() || null;
  const urlUtmCampaign = searchParams.get("utm_campaign")?.trim() || null;
  const urlUtmContent = searchParams.get("utm_content")?.trim() || null;
  const urlUtmTerm = searchParams.get("utm_term")?.trim() || null;
  const urlFbclid = searchParams.get("fbclid")?.trim() || null;
  const urlGclid = searchParams.get("gclid")?.trim() || null;

  const cookieFbp = readCookie("_fbp");
  let cookieFbc = readCookie("_fbc");

  const fbclid = urlFbclid || existing?.fbclid || null;

  // Build standard Meta _fbc format if fbclid arrived and _fbc cookie is absent
  if (!cookieFbc && fbclid) {
    cookieFbc = `fb.1.${Date.now()}.${fbclid}`;
  }

  const rawReferrer = document.referrer?.trim() || null;
  let externalReferrer = existing?.referrer || null;
  if (rawReferrer) {
    try {
      const refHost = new URL(rawReferrer).hostname;
      if (refHost && refHost !== window.location.hostname) {
        externalReferrer = existing?.referrer || rawReferrer.slice(0, 950);
      }
    } catch {
      // Ignore invalid referrer
    }
  }

  const currentLanding = `${window.location.pathname}${window.location.search}`.slice(
    0,
    950
  );

  const hasNewCampaignParams = Boolean(
    urlUtmSource ||
      urlUtmMedium ||
      urlUtmCampaign ||
      urlUtmContent ||
      urlUtmTerm ||
      urlFbclid ||
      urlGclid
  );

  const utmSource = urlUtmSource || existing?.utmSource || null;
  const utmMedium = urlUtmMedium || existing?.utmMedium || null;
  const utmCampaign = urlUtmCampaign || existing?.utmCampaign || null;
  const utmContent = urlUtmContent || existing?.utmContent || null;
  const utmTerm = urlUtmTerm || existing?.utmTerm || null;

  const landingPage = hasNewCampaignParams
    ? currentLanding
    : existing?.landingPage || currentLanding;

  const source =
    hasNewCampaignParams || !existing?.source
      ? inferSource({
          utmSource,
          utmMedium,
          fbclid,
          gclid: urlGclid,
          referrer: externalReferrer,
        })
      : existing.source;

  const merged: AttributionData = {
    source,
    landingPage,
    referrer: externalReferrer,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    fbclid,
    fbp: cookieFbp || existing?.fbp || null,
    fbc: cookieFbc || existing?.fbc || null,
  };

  persistAttribution(merged);
  return merged;
}

/**
 * Returns the latest captured attribution snapshot including live _fbp/_fbc cookies.
 */
export function getAttributionData(): AttributionData {
  const captured = captureAttribution();
  if (captured) return captured;

  return {
    source: "website_form",
    landingPage: null,
    referrer: null,
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmContent: null,
    utmTerm: null,
    fbclid: null,
    fbp: null,
    fbc: null,
  };
}
