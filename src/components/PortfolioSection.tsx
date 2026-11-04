"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  X,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  Sparkles,
  BookOpen,
  Car,
  MapPin,
  Calendar,
  Users,
  Smartphone,
  Rocket,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const caseMeta: Record<
  string,
  {
    badgeColor: string;
    badgeBg: string;
    accentGradient: string;
    tags: string[];
    playStoreUrl: string;
  }
> = {
  karamty: {
    badgeColor: "text-[#1366FF]",
    badgeBg: "bg-blue-50/95 border-blue-200/80",
    accentGradient: "from-[#0F1D3D] via-[#0A1226] to-[#1366FF]/70",
    tags: [
      "Flutter",
      "Firebase Cloud",
      "Offline-First Sync",
      "Push Notifications",
      "Arabic UX",
    ],
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.karamty.karamty_app",
  },
  inride: {
    badgeColor: "text-emerald-600",
    badgeBg: "bg-emerald-50/95 border-emerald-200/80",
    accentGradient: "from-[#081824] via-[#09151F] to-[#0284C7]/70",
    tags: [
      "Flutter",
      "Node.js WebSockets",
      "Google Maps SDK",
      "Fare Negotiation",
      "Live GPS Tracking",
    ],
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.inride.inride_app",
  },
};

// ============================================================================
// REALISTIC HIGH-FIDELITY PHONE MOCKUP PREVIEW FOR THE CARDS
// ============================================================================
function CardVisualPreview({
  type,
  isAr,
}: {
  type: "karamty" | "inride" | "cta";
  isAr: boolean;
}) {
  if (type === "karamty") {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#12072B] via-[#1B0B3B] to-[#2E1065] flex items-center justify-center p-6 sm:p-8 overflow-hidden select-none">
        {/* Soft Ambient Brand Glows */}
        <div className="absolute inset-0 bg-purple-600/20 blur-[50px] rounded-full pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/25 blur-[40px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#1366FF]/20 blur-[40px] rounded-full pointer-events-none" />

        {/* Full Size Prominent Karamty Logo - Takes Whole Area */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="relative group-hover:scale-110 transition-transform duration-500">
            <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/30 to-[#1366FF]/30 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
            <img
              src="/images/karamty-logo.jpg"
              alt="شعار تطبيق كرمتي الرسمي"
              className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full border-4 border-white/90 shadow-[0_20px_50px_rgba(147,51,234,0.45)] object-contain bg-white"
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "inride") {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-[#051329] via-[#091E3D] to-[#0284C7]/80 flex items-center justify-center p-6 sm:p-8 overflow-hidden select-none">
        {/* Soft Ambient Brand Glows */}
        <div className="absolute inset-0 bg-sky-500/20 blur-[50px] rounded-full pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/25 blur-[40px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-400/20 blur-[40px] rounded-full pointer-events-none" />

        {/* Full Size Prominent inRide Logo - Takes Whole Area */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="relative group-hover:scale-110 transition-transform duration-500">
            <div className="absolute -inset-3 bg-gradient-to-r from-sky-500/30 to-blue-600/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
            <img
              src="/images/inride-logo.png"
              alt="شعار تطبيق إن رايد الرسمي"
              className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-3xl border-4 border-white/90 shadow-[0_20px_50px_rgba(2,132,199,0.45)] object-contain bg-white p-3 sm:p-4"
            />
          </div>
        </div>
      </div>
    );
  }

  // Card 3: 3D App Design Icon - Takes Whole Area Without Phone Frame
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#090D1A] via-[#0E1E42] to-[#1366FF] flex items-center justify-center p-6 sm:p-8 overflow-hidden select-none">
      {/* Dynamic Radial Ambient Lights */}
      <div className="absolute inset-0 bg-[#1366FF]/30 blur-[45px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#00C6FF]/25 blur-[40px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-purple-500/20 blur-[40px] rounded-full pointer-events-none" />

      {/* Full Size Prominent 3D App Design Icon */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="relative group-hover:scale-110 transition-transform duration-500">
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#1366FF]/50 to-[#00C6FF]/40 rounded-3xl blur-2xl opacity-80 group-hover:opacity-100 transition duration-500" />
          <img
            src="/images/app-design-3d.png"
            alt="أيقونة خدمة تصميم وتطوير التطبيقات 3D"
            className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 object-contain rounded-3xl drop-shadow-[0_25px_60px_rgba(19,102,255,0.6)]"
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PORTFOLIO COMPONENT
// ============================================================================
export default function PortfolioSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const t = translations[lang].portfolio;
  const [selectedCase, setSelectedCase] = useState<(typeof t.cases)[0] | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative" id="portfolio">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1366FF] border border-blue-200/80 text-xs font-bold mb-3 sm:mb-4 shadow-xs">
            <Smartphone className="w-3.5 h-3.5 text-[#1366FF]" />
            <span>{isAr ? "سابقة أعمال كيمفو ستوديو" : "Kemvo Studio Portfolio"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#090D1A] tracking-tight leading-tight">
            {t.headline}
          </h2>
          <p className="text-[#525B75] text-sm sm:text-base md:text-lg mt-3 leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 3-Column Harmonious Grid Matching the Reference Image Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 items-stretch">
          {/* ================================================================
              SLOT 1 & SLOT 2: REAL PRODUCTION APPS (Karamty & inRide)
              ================================================================ */}
          {t.cases.map((item) => {
            const meta = caseMeta[item.id] || caseMeta.karamty;

            return (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200/80 bg-[#FAFCFF] overflow-hidden hover:shadow-apple hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                {/* Card Top: Mockup Visual Canvas */}
                <div>
                  <div
                    onClick={() => setSelectedCase(item)}
                    className="cursor-pointer relative h-56 sm:h-64 md:h-72 bg-slate-900 overflow-hidden"
                  >
                    <CardVisualPreview
                      type={item.id === "karamty" ? "karamty" : "inride"}
                      isAr={isAr}
                    />

                    {/* Floating Category Badge */}
                    <div
                      className={`absolute top-3.5 right-3.5 sm:top-4 sm:right-4 backdrop-blur-md px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-xs border ${meta.badgeBg} ${meta.badgeColor}`}
                    >
                      {item.categoryLabel}
                    </div>

                    {/* Floating Metric Badge */}
                    <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 bg-slate-900/85 backdrop-blur-md px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item.metric}</span>
                    </div>
                  </div>

                  {/* Card Body: App Name and Tagline */}
                  <div
                    onClick={() => setSelectedCase(item)}
                    className="cursor-pointer p-5 sm:p-6 md:p-8"
                  >
                    <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
                      <img
                        src={item.id === "karamty" ? "/images/karamty-logo.jpg" : "/images/inride-logo.png"}
                        alt={item.appName}
                        className={`w-9 h-9 sm:w-10 sm:h-10 object-contain shadow-xs shrink-0 group-hover:scale-105 transition-transform ${
                          item.id === "karamty" ? "rounded-full border border-purple-200" : "rounded-xl border border-sky-200"
                        }`}
                      />
                      <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#090D1A] group-hover:text-[#1366FF] transition-colors leading-snug">
                        {item.appName}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-[#525B75] leading-relaxed font-normal">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                {/* Minimalist Action Footer */}
                <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 pt-0">
                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#1366FF]">
                    <button
                      onClick={() => setSelectedCase(item)}
                      className="flex items-center gap-1.5 hover:text-[#252BFA] transition-colors cursor-pointer"
                    >
                      <span>{t.viewFullStudy}</span>
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 ltr:rotate-180 ltr:group-hover:translate-x-1.5" />
                    </button>

                    {item.playStoreUrl && (
                      <a
                        href={item.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1366FF] border border-slate-200/80 transition-colors text-[11px] font-semibold"
                      >
                        <span>{t.viewOnPlayStore}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ================================================================
              SLOT 3: HIGH-CONVERTING CTA CARD (Invite user to build their app)
              Exact same card architecture, dimensions, and visual elegance
              ================================================================ */}
          <div className="rounded-3xl border border-blue-200/90 bg-gradient-to-b from-[#FAFCFF] via-[#F4F8FF] to-blue-50/50 overflow-hidden hover:shadow-apple hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5">
            <div>
              {/* Card Top: Blueprint Visual Mockup */}
              <a
                href="#contact"
                className="block relative h-56 sm:h-64 md:h-72 bg-slate-900 overflow-hidden cursor-pointer"
              >
                <CardVisualPreview type="cta" isAr={isAr} />

                {/* Floating Category Badge */}
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 backdrop-blur-md px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-xs border bg-blue-50/95 border-blue-200/90 text-[#1366FF]">
                  {t.ctaCard?.categoryLabel || "✨ مشروعك القادم"}
                </div>

                {/* Floating Metric Badge */}
                <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 bg-slate-900/85 backdrop-blur-md px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t.ctaCard?.metric || "جاهز للإطلاق 🚀"}</span>
                </div>
              </a>

              {/* Card Body */}
              <div className="p-5 sm:p-6 md:p-8">
                <a href="#contact" className="group-hover:text-[#1366FF] transition-colors">
                  <div className="flex items-center gap-3 mb-2 sm:mb-2.5">
                    <img
                      src="/images/app-design-3d.png"
                      alt="خدمة تصميم التطبيقات 3D"
                      className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-xl shadow-xs shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#090D1A] group-hover:text-[#1366FF] transition-colors leading-snug">
                      {t.ctaCard?.appName || "«فكرتك القادمة تبدأ هنا»"}
                    </h3>
                  </div>
                </a>
                <p className="text-xs sm:text-sm md:text-base text-[#525B75] leading-relaxed font-normal">
                  {t.ctaCard?.tagline ||
                    "هل لديك فكرة تطبيق مبتكرة؟ دعنا نحولها إلى منتج رقمي استثنائي ينافس عالمياً بنظام تصميم Apple ومعايير هندسية فائقة السرعة."}
                </p>
              </div>
            </div>

            {/* High-Converting CTA Footer */}
            <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 pt-0">
              <div className="pt-4 border-t border-blue-200/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1366FF] to-[#252BFA] hover:from-[#0052E0] hover:to-[#1A20EA] text-white text-xs font-bold shadow-glow-sm hover:shadow-glow transition-all duration-300 text-center"
                >
                  <span>{t.ctaCard?.ctaButton || "ابدأ بناء تطبيقك الآن"}</span>
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1" />
                </a>

                <span className="text-[11px] font-medium text-slate-500 text-center sm:text-end">
                  {t.ctaCard?.freeConsult || "استشارة مجانية 100%"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          CASE STUDY DETAIL MODAL (Completely intact + Direct Google Play Link)
          ==================================================================== */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-apple border border-slate-100 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 left-4 sm:top-5 sm:left-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${caseMeta[selectedCase.id]?.badgeBg || "bg-blue-50"} ${caseMeta[selectedCase.id]?.badgeColor || "text-blue-600"}`}
              >
                {selectedCase.categoryLabel}
              </span>
              <span className="text-xs text-slate-400">
                {t.modalDuration} {selectedCase.fullDetails.timeline}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedCase.id === "karamty" ? "/images/karamty-logo.jpg" : "/images/inride-logo.png"}
                alt={selectedCase.title}
                className={`w-10 h-10 object-contain shadow-xs shrink-0 ${
                  selectedCase.id === "karamty" ? "rounded-full border border-purple-200" : "rounded-xl border border-sky-200"
                }`}
              />
              <h3 className="text-xl sm:text-2xl font-bold text-[#090D1A]">
                {selectedCase.title}
              </h3>
            </div>

            {/* Modal Mockup Preview */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden h-52 sm:h-60 mb-5 sm:mb-6 border border-slate-100 shadow-sm">
              <CardVisualPreview
                type={selectedCase.id === "karamty" ? "karamty" : "inride"}
                isAr={isAr}
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#525B75] leading-relaxed">
              <div>
                <h4 className="font-bold text-[#090D1A] text-sm sm:text-base mb-1">
                  {t.modalChallenge}
                </h4>
                <p>{selectedCase.fullDetails.challenge}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#090D1A] text-sm sm:text-base mb-1">
                  {t.modalSolution}
                </h4>
                <p>{selectedCase.fullDetails.solution}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#090D1A] text-sm sm:text-base mb-2">
                  {t.modalImpact}
                </h4>
                <ul className="space-y-2">
                  {selectedCase.fullDetails.impact.map((imp, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[#090D1A]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <h4 className="font-bold text-[#090D1A] text-xs mb-2">
                  {t.modalTech}
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {caseMeta[selectedCase.id]?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-mono font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions with Direct Google Play Link */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {selectedCase.playStoreUrl && (
                  <a
                    href={selectedCase.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all text-center shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t.downloadOnPlayStore}</span>
                  </a>
                )}

                <a
                  href="#contact"
                  onClick={() => setSelectedCase(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-[#1366FF] to-[#252BFA] text-white text-xs font-bold hover:shadow-glow-sm transition-all text-center"
                >
                  {t.requestSimilar}
                </a>
              </div>

              <button
                onClick={() => setSelectedCase(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors text-center cursor-pointer"
              >
                {translations[lang].services.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
