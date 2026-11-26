"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function HeroSection() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section className="relative pt-20 sm:pt-28 md:pt-32 pb-10 sm:pb-14 md:pb-16 overflow-hidden bg-grid-pattern">
      {/* Ambient Light Blooms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] md:w-[700px] h-[350px] md:h-[450px] bg-gradient-to-tr from-[#1366FF]/20 via-[#38BDF8]/15 to-transparent rounded-full blur-[100px] md:blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-16 left-10 w-64 md:w-96 h-64 md:h-96 bg-[#00C6FF]/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-64 md:w-96 h-64 md:h-96 bg-[#252BFA]/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Top Textual Stack */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-extrabold text-[#090D1A] tracking-tight leading-[1.22] sm:leading-[1.14] mb-4 sm:mb-6">
            {t.headlinePrefix} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#004FD0] via-[#1366FF] to-[#00C6FF] bg-clip-text text-transparent">
              {t.headlineHighlight}
            </span>{" "}
            {t.headlineSuffix}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#525B75] max-w-2xl font-normal leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
            {t.subtitle}
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center w-full sm:w-auto px-4 sm:px-0">
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#1366FF] to-[#252BFA] hover:from-[#0052E0] hover:to-[#1A20EA] text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-glow-sm hover:shadow-glow transform hover:-translate-y-0.5 active:scale-95 group text-center"
            >
              <span>{t.ctaPrimary}</span>
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1" />
            </a>
          </div>

          {/* Key Metrics */}
          <div className="mt-6 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200/80 w-full max-w-2xl grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="flex flex-col">
              <span dir="ltr" className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#090D1A]">
                {t.metric1Value}
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm text-[#525B75] mt-0.5 font-medium">
                {t.metric1Label}
              </span>
            </div>
            <div className="flex flex-col border-x border-slate-200/70">
              <span dir="ltr" className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1366FF]">
                {t.metric2Value}
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm text-[#525B75] mt-0.5 font-medium">
                {t.metric2Label}
              </span>
            </div>
            <div className="flex flex-col">
              <span dir="ltr" className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#090D1A]">
                {t.metric3Value}
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm text-[#525B75] mt-0.5 font-medium">
                {t.metric3Label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
