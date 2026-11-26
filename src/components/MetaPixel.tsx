"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  getMetaPixelId,
  trackMetaEvent,
  type KemvoLeadSavedDetail,
} from "@/lib/tracking/metaPixel";

/**
 * Loads Meta Pixel on public routes, tracks SPA PageView / ViewContent navigation,
 * and maps verified lead submissions and direct contact clicks to standard Meta events.
 */
export default function MetaPixel() {
  const pixelId = getMetaPixelId();
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  const pathnameRef = useRef(pathname);
  const lastPageViewPathRef = useRef<string | null>(null);
  const lastViewContentPathRef = useRef<string | null>(null);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const fireServiceViewContent = (currentPath: string | null) => {
    if (!currentPath || !currentPath.startsWith("/services/")) return;
    if (lastViewContentPathRef.current === currentPath) return;

    const slug = currentPath.slice("/services/".length).split("/")[0]?.trim();
    if (!slug || typeof window === "undefined" || typeof window.fbq !== "function") {
      return;
    }

    lastViewContentPathRef.current = currentPath;
    trackMetaEvent("ViewContent", {
      content_name: slug,
      content_category: "service",
      content_ids: [slug],
      content_type: "product",
    });
  };

  useEffect(() => {
    if (!pixelId || isAdminRoute || !pathname) return;

    if (lastPageViewPathRef.current === null) {
      // Initial PageView is fired by the inline pixel snippet on first load.
      lastPageViewPathRef.current = pathname;
    } else if (lastPageViewPathRef.current !== pathname) {
      lastPageViewPathRef.current = pathname;
      trackMetaEvent("PageView");
    }

    if (typeof window !== "undefined" && window.__kemvoPixelReady) {
      fireServiceViewContent(pathname);
    }
  }, [pathname, pixelId, isAdminRoute]);

  useEffect(() => {
    if (!pixelId || isAdminRoute) return;

    const handlePixelReady = () => {
      fireServiceViewContent(pathnameRef.current);
    };

    const handleLeadSaved = (event: Event) => {
      const detail = (event as CustomEvent<KemvoLeadSavedDetail>).detail;
      if (!detail || detail.isDuplicate) return;

      trackMetaEvent(
        "Lead",
        {
          content_name: detail.serviceType || "Consultation",
          content_category: detail.serviceSlug || "consultation",
        },
        detail.refCode ? { eventID: detail.refCode } : undefined
      );
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor || anchor.dataset.skipPixelContact === "true") return;

      const href = anchor.getAttribute("href") || "";
      const currentPath = pathnameRef.current || "/";

      if (href.startsWith("https://wa.me/") || href.startsWith("http://wa.me/")) {
        trackMetaEvent("Contact", {
          content_name: "whatsapp_direct",
          content_category: currentPath,
        });
      } else if (href.startsWith("mailto:")) {
        trackMetaEvent("Contact", {
          content_name: "email_direct",
          content_category: currentPath,
        });
      }
    };

    window.addEventListener("kemvo:meta_pixel_ready", handlePixelReady);
    window.addEventListener("kemvo:lead_saved", handleLeadSaved);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("kemvo:meta_pixel_ready", handlePixelReady);
      window.removeEventListener("kemvo:lead_saved", handleLeadSaved);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [pixelId, isAdminRoute]);

  if (!pixelId || isAdminRoute) {
    return null;
  }

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
          window.__kemvoPixelReady = true;
          window.dispatchEvent(new Event('kemvo:meta_pixel_ready'));
        `}
      </Script>
      <noscript>
        <img
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
