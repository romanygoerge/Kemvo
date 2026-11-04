"use client";

import React from "react";
import { Search, Palette, Code2, Rocket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function ProcessSection() {
  const { lang } = useLanguage();
  const t = translations[lang].process;

  const icons = [Search, Palette, Code2, Rocket];

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-[#FAFCFF] relative" id="process">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#090D1A] tracking-tight">
            {t.headline}
          </h2>
          <p className="text-[#525B75] text-xs sm:text-sm md:text-base mt-2 sm:mt-2.5 leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {t.steps.map((step, idx) => {
            const Icon = icons[idx] || Rocket;
            return (
              <div
                key={step.num}
                className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-subtle flex flex-col justify-between hover:shadow-apple transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[#1366FF]/30 font-mono group-hover:text-[#1366FF] transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1366FF] flex items-center justify-center group-hover:bg-[#1366FF] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#090D1A] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#525B75] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-[#94A3B8]">
                  {step.deliverable}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

