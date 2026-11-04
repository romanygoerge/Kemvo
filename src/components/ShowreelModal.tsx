"use client";

import React from "react";
import { X, Play, Sparkles, Smartphone, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  const { lang } = useLanguage();
  const t = translations[lang].showreel;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl max-w-4xl w-full p-5 sm:p-6 md:p-8 shadow-floating relative text-white animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 ltr:left-auto ltr:right-4 sm:top-5 sm:left-5 ltr:sm:right-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors focus:outline-none"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1366FF] animate-ping" />
          <span className="text-xs font-bold text-[#38BDF8] tracking-widest uppercase font-mono">
            {t.badge}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 sm:mb-4">
          {t.headline}
        </h3>

        {/* Video Player Simulator */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video bg-gradient-to-tr from-slate-950 via-slate-900 to-[#002D80] flex items-center justify-center border border-slate-800 group shadow-2xl">
          <img
            src="/images/screen.png"
            alt="Kemvo Studio Showreel"
            className="w-full h-full object-cover opacity-60 group-hover:scale-102 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />

          <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 text-center p-4 sm:p-6">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#1366FF] hover:bg-[#0052E0] text-white flex items-center justify-center shadow-glow transition-all transform hover:scale-110 cursor-pointer">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {t.subtitle}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-400">
              <span>Apple HIG Standards</span>
              <span>•</span>
              <span>60 FPS Fluid Motion</span>
              <span>•</span>
              <span>Design Tokens Code</span>
            </div>
          </div>
        </div>

        {/* Bottom Highlights */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>
              {lang === "ar"
                ? "عرض تفاعلي لأعمال FinTech, Logistics, HealthTech"
                : "Interactive showcase of FinTech, Logistics, HealthTech"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
          >
            {lang === "ar" ? "إغلاق العرض" : "Close Showcase"}
          </button>
        </div>
      </div>
    </div>
  );
}

