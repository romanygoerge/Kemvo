export interface MetaPixelEventParams {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}

export interface MetaPixelEventOptions {
  eventID?: string;
}

export interface KemvoLeadSavedDetail {
  leadId?: string;
  refCode?: string;
  serviceType?: string;
  serviceSlug?: string | null;
  budget?: string | null;
  source?: string;
  isDuplicate?: boolean;
}

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
      push?: (...args: unknown[]) => void;
    };
    _fbq?: unknown;
    __kemvoPixelReady?: boolean;
  }
}

const SAFE_PIXEL_ID_PATTERN = /^\d{10,20}$/;

/** Validates and returns the configured Meta Pixel ID from public environment variables. */
export function getMetaPixelId(): string | null {
  const raw = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";
  return SAFE_PIXEL_ID_PATTERN.test(raw) ? raw : null;
}

/** Fires a standard Meta Pixel event if fbq has been initialized on the page. */
export function trackMetaEvent(
  eventName: "PageView" | "ViewContent" | "Lead" | "Contact",
  params?: MetaPixelEventParams,
  options?: MetaPixelEventOptions
): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  if (options?.eventID) {
    window.fbq("track", eventName, params ?? {}, { eventID: options.eventID });
    return;
  }

  if (params) {
    window.fbq("track", eventName, params);
    return;
  }

  window.fbq("track", eventName);
}
