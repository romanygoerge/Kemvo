"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/tracking/attribution";

/**
 * Captures UTM parameters, fbclid, _fbp, _fbc, landing page, and referrer across App Router navigation.
 */
export default function AttributionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  return null;
}
