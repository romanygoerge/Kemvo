"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function TestimonialsSection() {
  const { lang } = useLanguage();
  const t = translations[lang].reviews;

  const avatarColors = [
    "bg-blue-100 text-[#1366FF]",
    "bg-sky-100 text-sky-700",
    "bg-indigo-100 text-indigo-700",
  ];

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-white relative" id="reviews">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#090D1A] tracking-tight">
              {t.headline}
            </h2>
          </div>

          {/* Stars & Rating Summary */}
          <div className="flex items-center gap-1.5 bg-amber-50/80 px-4 py-2 rounded-full border border-amber-200/60 w-fit">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-extrabold text-[#090D1A] mr-2 ltr:mr-0 ltr:ml-2">
              {t.ratingSummary}
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((rev, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FAFCFF] border border-slate-200/80 shadow-subtle hover:shadow-apple transition-all duration-300 flex flex-col justify-between gap-6 hover:-translate-y-1 relative"
            >
              <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-blue-200/70 absolute top-5 left-5 ltr:left-auto ltr:right-5 sm:top-6 sm:left-6 ltr:sm:right-6" />

              <p className="text-xs sm:text-sm md:text-base text-[#090D1A] leading-relaxed font-normal relative z-10 pt-2">
                "{rev.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full font-bold flex items-center justify-center text-xs sm:text-sm ${
                    avatarColors[index % avatarColors.length]
                  }`}
                >
                  {rev.initials}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#090D1A]">{rev.name}</div>
                  <div className="text-[11px] sm:text-xs text-[#525B75]">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

