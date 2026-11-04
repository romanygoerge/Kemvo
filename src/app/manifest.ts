import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kemvo Studio | شركة تصميم وتطوير تطبيقات ومواقع",
    short_name: "Kemvo Studio",
    description:
      "استوديو نخبوي لتصميم وتطوير تطبيقات الجوال Android و iOS والمواقع الإلكترونية بأحدث التقنيات.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFCFF",
    theme_color: "#1366FF",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/logo-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
