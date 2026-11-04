import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Smartphone,
  WifiOff,
  ShieldCheck,
  Zap,
  Clock,
  Rocket,
  Server,
  MessageSquare,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { servicesData, ServiceDetailData } from "@/lib/servicesData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return {
      title: "الخدمة غير موجودة | Kemvo Studio",
    };
  }

  const baseUrl = "https://kemvo.vercel.app";
  const canonicalUrl = `${baseUrl}/services/${slug}`;

  return {
    title: service.seoTitleAr,
    description: service.seoDescAr,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "ar": canonicalUrl,
        "en": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: service.seoTitleAr,
      description: service.seoDescAr,
      siteName: "Kemvo Studio",
      images: [
        {
          url: "/images/logo-full.png",
          width: 1200,
          height: 630,
          alt: service.h1Ar,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitleAr,
      description: service.seoDescAr,
      images: ["/images/logo-full.png"],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  const baseUrl = "https://kemvo.vercel.app";
  const pageUrl = `${baseUrl}/services/${slug}`;

  // 1. Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: service.titleAr,
    alternateName: service.titleEn,
    description: service.seoDescAr,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: "Kemvo Studio",
      url: baseUrl,
      logo: `${baseUrl}/images/logo-full.png`,
      telephone: "+201204062941",
      email: "hello@kemvo.studio",
    },
    serviceType: service.titleEn,
    areaServed: ["Egypt", "Saudi Arabia", "United Arab Emirates", "GCC", "Worldwide"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.titleAr,
      itemListElement: service.deliverablesAr.map((deliv, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: deliv,
        },
      })),
    },
  };

  // 2. Breadcrumbs Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "خدماتنا",
        item: `${baseUrl}#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.titleAr,
        item: pageUrl,
      },
    ],
  };

  // 3. FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.qAr,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.aAr,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#FAFCFF] flex flex-col relative selection:bg-[#1366FF] selection:text-white">
      {/* Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      {/* Hero & Breadcrumbs Section */}
      <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 overflow-hidden bg-grid-pattern border-b border-slate-200/70">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] bg-gradient-to-tr from-[#1366FF]/20 via-[#38BDF8]/15 to-transparent rounded-full blur-[110px] pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
              <li>
                <Link href="/" className="hover:text-[#1366FF] transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/#services" className="hover:text-[#1366FF] transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#1366FF] font-bold" aria-current="page">
                {service.titleAr}
              </li>
            </ol>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 text-[#1366FF] border border-blue-200/80 text-xs font-bold mb-4 shadow-xs">
            <span>{service.badgeAr}</span>
          </div>

          {/* Master H1 Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#090D1A] tracking-tight leading-[1.2] mb-5">
            {service.h1Ar}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#525B75] max-w-3xl leading-relaxed mb-8">
            {service.subheadlineAr}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-10">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#1366FF] to-[#252BFA] hover:from-[#0052E0] hover:to-[#1A20EA] text-white font-semibold text-sm sm:text-base shadow-glow-sm hover:shadow-glow transition-all duration-300"
            >
              <span>ناقش متطلبات مشروعك معنا</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/201204062941"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#090D1A] font-semibold text-sm sm:text-base border border-slate-200 shadow-subtle hover:shadow-apple transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>محادثة فورية عبر واتساب</span>
            </a>
          </div>

          {/* Key Stats Strip */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-white/95 border border-slate-200/80 shadow-xs max-w-2xl">
            {service.stats.map((st, i) => (
              <div key={i} className="flex flex-col text-start">
                <span className="text-xl sm:text-3xl font-extrabold text-[#1366FF] font-mono">
                  {st.value}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-600 mt-1 font-medium">
                  {st.labelAr}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Engineering Pillars */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-start max-w-2xl mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#090D1A] tracking-tight">
              معاييرنا الهندسية في {service.titleAr}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              نطبق أعلى معايير الجودة والاستقرار لضمان منتج رقمي سريع، آمن، ومقاوم للأخطاء.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200/80 bg-[#FAFCFF] hover:border-blue-300 hover:shadow-apple transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1366FF] flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#090D1A] mb-2">
                    {pillar.titleAr}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525B75] leading-relaxed">
                    {pillar.descAr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables & Technology Stack */}
      <section className="py-12 sm:py-16 bg-[#FAFCFF] border-y border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Deliverables Checklist */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#090D1A] mb-4">
                ما الذي تتسلمه في هذا المشروع؟
              </h2>
              <p className="text-slate-600 text-sm mb-6">
                تسليمات مرحلية شفافة وموثقة بالكامل تضمن سيطرتك الكاملة على كافة جوانب منتجك الرقمي.
              </p>

              <div className="space-y-3">
                {service.deliverablesAr.map((deliv, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#090D1A]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack & Highlight */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <h3 className="text-base font-bold text-[#090D1A] mb-3">
                  التقنيات المعتمدة في هذا المسار
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-blue-50 text-[#1366FF] border border-blue-200/80 text-xs font-mono font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Case Study Feature (if present) */}
              {service.caseStudyHighlight && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#090D1A] to-[#0E1E42] text-white border border-blue-400/30 shadow-apple">
                  <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase block mb-1">
                    قصة نجاح واقعية • Case Study
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {service.caseStudyHighlight.appNameAr}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {service.caseStudyHighlight.descAr}
                  </p>
                  <a
                    href={service.caseStudyHighlight.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-200"
                  >
                    <span>استعراض على Google Play</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific FAQs */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#090D1A]">
              الأسئلة الشائعة حول {service.titleAr}
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-slate-200/80 bg-[#FAFCFF]"
              >
                <h3 className="text-base font-bold text-[#090D1A] mb-2">
                  {faq.qAr}
                </h3>
                <p className="text-xs sm:text-sm text-[#525B75] leading-relaxed">
                  {faq.aAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion CTA Banner */}
      <section className="py-12 sm:py-16 bg-[#FAFCFF] border-t border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#090D1A] via-[#0E1E42] to-[#1366FF] text-white shadow-2xl relative overflow-hidden">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              جاهز لبدء مشروع {service.titleAr}؟
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
              تحدث مباشرة مع فريق كيمفو ستوديو لمناقشة فكرتك، تقدير التكلفة، والحصول على خارطة طريق واضحة خلال 24 ساعة.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#contact"
                className="px-7 py-3 rounded-full bg-white text-[#090D1A] hover:bg-slate-100 font-bold text-sm shadow-apple transition-all"
              >
                طلب استشارة وعرض سعر
              </Link>
              <a
                href="https://wa.me/201204062941"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
              >
                واتساب مباشر: 201204062941+
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
