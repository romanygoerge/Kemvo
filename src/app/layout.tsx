import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1366FF",
};

export const metadata: Metadata = {
  title: "Kemvo Studio | استوديو تصميم وتطوير التطبيقات الرقمية العالمية",
  description:
    "استوديو نخبوي يمزج بين دقة واجهات Apple وتطور منظومة الويب الحديثة بـ Next.js و Swift و Framer Motion لبناء منتجات رقمية رشيقة تلهم الملايين وتنمو بسرعة.",
  keywords: [
    "تصميم تطبيقات",
    "تطوير تطبيقات الجوال",
    "Next.js",
    "UI/UX Design",
    "استوديو برمجة",
    "أنظمة التصميم",
    "Design System",
    "iOS",
    "Flutter",
    "Kemvo Studio",
  ],
  authors: [{ name: "Kemvo Studio" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexArabic.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FAFCFF] text-[#090D1A] antialiased selection:bg-[#1366FF] selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
