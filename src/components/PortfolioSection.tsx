"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  X,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const caseMeta: Record<
  string,
  { image: string; badgeColor: string; badgeBg: string; tags: string[] }
> = {
  darahim: {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBz5ScpzrIY_nWp9YJsDFLi8cXfAqISBtnn9UyxSaUYBZVqZFI2es17mnPd6k4HYJK7DBVvdwBt8gmnMkEzCbiQBNcwaVpPWc-HhVcaCp0hjgf3OQI3CMnxk3Y1NsG9uP8ZUo85F547dRZk8DPK_A8uxCkmCjDD8_Kd5Y2bcKtXUptRKVed6n1FFUhXzIl52MVSXJzGkvIsDyLfx9VPFVOWaeZL-kxFHYIkQMTeevM",
    badgeColor: "text-[#1366FF]",
    badgeBg: "bg-blue-50/95 border-blue-200/80",
    tags: ["Flutter", "iOS Native", "Next.js", "Apple Pay"],
  },
  saree: {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrBaLeXrrNByzExBP6D9oBHz63FAeunq88Ttks9KN1Zabv_8vKZNu6uP6gB5a6zzDNXwfnrUxxrYvDnbKbxPIHBnrEhL0xgQtO20FPgg03zUK61U79mZkdHOWG3UKj6rsISR3SRT0vqum9A35rIReBwIlJmpbHVOJBeDmPrrPiTK5C4XysHKi0l1IJ1-je9Llpc4ZR9FINs4HitrVX-bbTJe52JXriEZZVazcsrOs",
    badgeColor: "text-sky-600",
    badgeBg: "bg-sky-50/95 border-sky-200/80",
    tags: ["Native Swift", "WebSockets", "GPS Engine", "Cloud API"],
  },
  aafiyati: {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBzwK_dNXY6J1LO-BYzjQhmgrLp7h187_BPjxbVl1VWbgTVAPNY0zEByPy13140KU17JybLyWtiDs9wHfJviksxV2hJdsUwOBLVgqDYGs93Gr8_4siLE8If5ZQDs3U1obyxl_sdSjB5xYP-AsptT_koyiHB1h1qRTc6g-QqWDmQflM_MpevmyWWwca8lEenEJnAQ8asNlsDNdXJ5J-gYJ6NG_FC85WKKhjiGgD_bEE",
    badgeColor: "text-indigo-600",
    badgeBg: "bg-indigo-50/95 border-indigo-200/80",
    tags: ["HIPAA Ready", "WebRTC", "Next.js", "Video Core"],
  },
};

export default function PortfolioSection() {
  const { lang } = useLanguage();
  const t = translations[lang].portfolio;
  const [selectedCase, setSelectedCase] = useState<(typeof t.cases)[0] | null>(null);

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-white relative" id="portfolio">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Unified, Centered & Highly Harmonious Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#090D1A] tracking-tight leading-tight">
            {t.headline}
          </h2>
          <p className="text-[#525B75] text-sm sm:text-base md:text-lg mt-3 leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 3-Column Harmonious Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 items-stretch">
          {t.cases.map((item) => {
            const meta = caseMeta[item.id] || caseMeta.darahim;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedCase(item)}
                className="cursor-pointer rounded-3xl border border-slate-200/80 bg-[#FAFCFF] overflow-hidden hover:shadow-apple hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                {/* Card Image Header with Mockup Screen */}
                <div>
                  <div className="relative h-52 sm:h-64 md:h-72 bg-slate-900 overflow-hidden">
                    <img
                      src={meta.image}
                      alt={item.appName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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

                  {/* Clean, Coordinated Card Body: ONLY App Name and Short Tagline */}
                  <div className="p-5 sm:p-6 md:p-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#090D1A] group-hover:text-[#1366FF] transition-colors leading-snug">
                      {item.appName}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#525B75] mt-2 sm:mt-2.5 leading-relaxed font-normal">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                {/* Minimalist Card Action */}
                <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 pt-0">
                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#1366FF] group-hover:text-[#252BFA] transition-colors">
                    <span className="flex items-center gap-1.5">
                      <span>{t.viewFullStudy}</span>
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 ltr:rotate-180 ltr:group-hover:translate-x-1.5" />
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-500">
                      {t.viewDetails}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-apple border border-slate-100 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-4 left-4 sm:top-5 sm:left-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors focus:outline-none"
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

            <h3 className="text-xl sm:text-2xl font-bold text-[#090D1A] mb-4">
              {selectedCase.title}
            </h3>

            <div className="rounded-xl sm:rounded-2xl overflow-hidden h-48 sm:h-56 mb-5 sm:mb-6">
              <img
                src={caseMeta[selectedCase.id]?.image}
                alt={selectedCase.title}
                className="w-full h-full object-cover"
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

            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="#contact"
                onClick={() => setSelectedCase(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#1366FF] to-[#252BFA] text-white text-xs font-bold hover:shadow-glow-sm transition-all text-center"
              >
                {t.requestSimilar}
              </a>
              <button
                onClick={() => setSelectedCase(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors text-center"
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
