import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://kemvo.vercel.app"),
  title: {
    default: "Kemvo Studio | شركة تصميم وتطوير تطبيقات ومواقع إلكترونية",
    template: "%s | Kemvo Studio",
  },
  description:
    "كيمفو ستوديو (Kemvo Studio) شركة رائدة متخصصة في تصميم وتطوير تطبيقات الجوال (Android & iOS) والمواقع الإلكترونية بأحدث تقنيات Flutter و Next.js و Swift. نحول أفكار الشركات والشركات الناشئة إلى منتجات رقمية رائدة وقابلة للتوسع.",
  keywords: [
    "شركة تصميم وتطوير تطبيقات",
    "شركة برمجة تطبيقات",
    "تصميم تطبيقات موبايل",
    "تطوير تطبيقات أندرويد وآيفون",
    "شركة تطوير مواقع إلكترونية",
    "تصميم واجهات المستخدم",
    "تطوير تطبيقات Flutter",
    "تكلفة إنشاء تطبيق موبايل",
    "شركة برمجيات",
    "Mobile App Development Company",
    "Mobile App Development Services",
    "Android App Development",
    "iOS App Development",
    "Flutter App Development Company",
    "Website Development Company",
    "Custom Software Development",
    "UI UX Design Agency",
    "Software Development Company",
    "Kemvo Studio",
    "كيمفو ستوديو",
  ],
  authors: [{ name: "Kemvo Studio", url: "https://kemvo.vercel.app" }],
  creator: "Kemvo Studio",
  publisher: "Kemvo Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "ar": "/",
      "en": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US", "ar_SA", "ar_AE"],
    url: "https://kemvo.vercel.app",
    siteName: "Kemvo Studio",
    title: "Kemvo Studio | شركة تصميم وتطوير تطبيقات ومواقع إلكترونية",
    description:
      "كيمفو ستوديو — نحول أفكارك إلى تطبيقات جوال ومنصات ويب استثنائية تنافس عالمياً بمعايير Apple HIG وتقنيات Flutter و Next.js.",
    images: [
      {
        url: "/images/logo-full.png",
        width: 1200,
        height: 630,
        alt: "Kemvo Studio | استوديو هندسة وتصميم المنتجات الرقمية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kemvo Studio | شركة تصميم وتطوير تطبيقات ومواقع إلكترونية",
    description:
      "تطوير تطبيقات جوال ومواقع ومنصات رقمية فائقة السرعة بـ Flutter و Next.js و Swift للشركات الناشئة ورواد الأعمال.",
    images: ["/images/logo-full.png"],
    creator: "@kemvostudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo-icon.png",
  },
  verification: {
    google: "u7rfacximhrVlYpRI4IrhO4kTNfn_3dchq8GBumsMhs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://kemvo.vercel.app/#organization",
    name: "Kemvo Studio",
    alternateName: ["كيمفو ستوديو", "كيمفو", "Kemvo"],
    url: "https://kemvo.vercel.app",
    logo: "https://kemvo.vercel.app/images/logo-full.png",
    image: "https://kemvo.vercel.app/images/logo-full.png",
    description:
      "استوديو هندسة وتصميم المنتجات الرقمية، متخصص في تطوير تطبيقات الجوال Android و iOS ومنصات الويب السحابية وتصميم UI/UX.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+201204062941",
        contactType: "customer service",
        email: "hello@kemvo.studio",
        areaServed: ["EG", "SA", "AE", "KW", "QA", "US", "GB"],
        availableLanguage: ["Arabic", "English"],
      },
    ],
    sameAs: [
      "https://github.com/romanygoerge/Kemvo",
      "https://wa.me/201204062941",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://kemvo.vercel.app/#website",
    url: "https://kemvo.vercel.app",
    name: "Kemvo Studio",
    publisher: {
      "@id": "https://kemvo.vercel.app/#organization",
    },
    inLanguage: ["ar", "en"],
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://kemvo.vercel.app/#service",
    name: "Kemvo Studio",
    url: "https://kemvo.vercel.app",
    logo: "https://kemvo.vercel.app/images/logo-full.png",
    image: "https://kemvo.vercel.app/images/logo-full.png",
    priceRange: "$$",
    telephone: "+201204062941",
    email: "hello@kemvo.studio",
    serviceArea: [
      "Egypt",
      "Saudi Arabia",
      "United Arab Emirates",
      "GCC",
      "Worldwide",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software & Mobile App Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description:
              "Native and Flutter mobile application engineering for iOS and Android.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Platform & Website Development",
            description:
              "Modern high-speed web apps and cloud platforms built with Next.js 15 and React.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design & Design Systems",
            description:
              "Apple-grade user interface and user experience design with production-ready tokens.",
          },
        },
      ],
    },
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexArabic.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <head>
        <meta name="google-site-verification" content="u7rfacximhrVlYpRI4IrhO4kTNfn_3dchq8GBumsMhs" />
        {/* Organization JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* WebSite JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        {/* ProfessionalService JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />

        {/* Google Analytics 4 (GA4) Integration */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen bg-[#FAFCFF] text-[#090D1A] antialiased selection:bg-[#1366FF] selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
