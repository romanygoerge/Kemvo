import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const now = new Date();

  const services = [
    "mobile-app-development",
    "flutter-app-development",
    "web-development",
    "ui-ux-design",
    "custom-software-development",
  ];

  const serviceUrls: MetadataRoute.Sitemap = services.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...serviceUrls,
  ];
}

