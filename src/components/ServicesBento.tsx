"use client";

import React, { useState } from "react";
import { ArrowLeft, X, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

// 1. High-End Custom 3D Vector Icon for UI/UX Design
function UIUXServiceIcon() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-sky-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
      {/* Outer Squircle Container */}
      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-white to-blue-50/80 border border-blue-200/90 shadow-subtle flex items-center justify-center group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300">
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <defs>
            <linearGradient id="uiux_grad_1" x1="8" y1="12" x2="56" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1366FF" />
              <stop offset="1" stopColor="#00C6FF" />
            </linearGradient>
            <linearGradient id="uiux_grad_2" x1="20" y1="20" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#252BFA" />
              <stop offset="1" stopColor="#1366FF" />
            </linearGradient>
          </defs>
          {/* Main App Canvas Window */}
          <rect x="10" y="12" width="44" height="34" rx="8" fill="white" stroke="url(#uiux_grad_1)" strokeWidth="2.5" />
          {/* Window Top Controls */}
          <circle cx="16" cy="18" r="2" fill="#FF5F56" />
          <circle cx="22" cy="18" r="2" fill="#FFBD2E" />
          <circle cx="28" cy="18" r="2" fill="#27C93F" />
          {/* Floating UI Components inside */}
          <rect x="16" y="24" width="16" height="16" rx="4" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
          <rect x="36" y="24" width="12" height="4" rx="2" fill="url(#uiux_grad_1)" />
          <rect x="36" y="31" width="8" height="3" rx="1.5" fill="#94A3B8" />
          <rect x="36" y="36" width="12" height="3" rx="1.5" fill="#CBD5E1" />
          {/* Floating Figma Pen / Designer Cursor */}
          <g filter="drop-shadow(0 4px 6px rgba(19, 102, 255, 0.35))">
            <path
              d="M38 34L48 48L42 50L38 46L34 52L31 50L35 44L30 42L38 34Z"
              fill="url(#uiux_grad_2)"
              stroke="white"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

// 2. High-End Custom 3D Vector Icon for Mobile Applications
function MobileServiceIcon() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-blue-600/20 to-teal-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
      {/* Outer Squircle Container */}
      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-white to-sky-50/80 border border-sky-200/90 shadow-subtle flex items-center justify-center group-hover:scale-105 group-hover:border-sky-400 transition-all duration-300">
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <defs>
            <linearGradient id="mob_grad_1" x1="18" y1="8" x2="46" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="1" stopColor="#00C6FF" />
            </linearGradient>
            <linearGradient id="mob_screen" x1="22" y1="16" x2="42" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0F172A" />
              <stop offset="1" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          {/* Smartphone Body */}
          <rect x="18" y="8" width="28" height="48" rx="7" fill="url(#mob_grad_1)" />
          {/* Inner Display Screen */}
          <rect x="20.5" y="10.5" width="23" height="43" rx="5" fill="url(#mob_screen)" />
          {/* Dynamic Island */}
          <rect x="28" y="12.5" width="8" height="2.5" rx="1.25" fill="#000" />
          {/* Screen Content: Mini App Cards */}
          <rect x="23" y="18" width="18" height="10" rx="2.5" fill="#1366FF" />
          <rect x="25" y="21" width="8" height="2" rx="1" fill="#FFF" />
          <rect x="25" y="24" width="5" height="1.5" rx="0.75" fill="#93C5FD" />
          {/* Mini Sparkline Chart */}
          <path d="M24 38L28 35L32 37L36 32L40 34" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
          {/* Floating Star / 60 FPS Badge */}
          <circle cx="44" cy="20" r="6" fill="#10B981" stroke="white" strokeWidth="1.5" />
          <path d="M42 20L43.5 21.5L46.5 18.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// 3. High-End Custom 3D Vector Icon for Web Platforms
function WebServiceIcon() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-[#1366FF]/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
      {/* Outer Squircle Container */}
      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-white to-indigo-50/80 border border-indigo-200/90 shadow-subtle flex items-center justify-center group-hover:scale-105 group-hover:border-indigo-400 transition-all duration-300">
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <defs>
            <linearGradient id="web_grad_1" x1="10" y1="12" x2="54" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="web_globe" x1="20" y1="20" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#1366FF" />
            </linearGradient>
          </defs>
          {/* Laptop / Browser Display Base */}
          <rect x="12" y="14" width="40" height="28" rx="6" fill="white" stroke="url(#web_grad_1)" strokeWidth="2.5" />
          <path d="M8 44C8 42.8954 8.89543 42 10 42H54C55.1046 42 56 42.8954 56 44V45C56 46.1046 55.1046 47 54 47H10C8.89543 47 8 46.1046 8 45V44Z" fill="#CBD5E1" />
          <rect x="27" y="42" width="10" height="2" rx="1" fill="#94A3B8" />
          {/* Browser Address Bar */}
          <rect x="16" y="18" width="32" height="4" rx="2" fill="#F1F5F9" />
          <circle cx="19" cy="20" r="1" fill="#94A3B8" />
          {/* Orbiting Global Web Grid */}
          <circle cx="32" cy="30" r="8" stroke="url(#web_globe)" strokeWidth="1.8" />
          <ellipse cx="32" cy="30" rx="3.5" ry="8" stroke="url(#web_globe)" strokeWidth="1.4" />
          <path d="M24 30H40" stroke="url(#web_globe)" strokeWidth="1.4" />
          {/* Floating Fast Code Tag Badge */}
          <g filter="drop-shadow(0 3px 5px rgba(79, 70, 229, 0.3))">
            <rect x="38" y="28" width="16" height="12" rx="3" fill="#4F46E5" stroke="white" strokeWidth="1.2" />
            <path d="M42 34L44 32M44 36L42 34M50 34L48 32M48 36L50 34" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function ServicesBento() {
  const { lang } = useLanguage();
  const t = translations[lang].services;
  const [selectedService, setSelectedService] = useState<(typeof t.items)[0] | null>(null);

  const iconMap: Record<string, React.ComponentType> = {
    uiux: UIUXServiceIcon,
    mobile: MobileServiceIcon,
    web: WebServiceIcon,
  };

  return (
    <section className="py-10 sm:py-14 md:py-16 relative bg-[#FAFCFF]" id="services">
      {/* Background Subtle Blooms */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[350px] bg-[#1366FF]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Unified, Centered Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#090D1A] tracking-tight leading-tight">
            {t.headline}
          </h2>
          <p className="text-[#525B75] text-sm sm:text-base md:text-lg mt-3 leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 3-Column Minimalist Centered Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 items-stretch w-full">
          {t.items.map((service) => {
            const Icon = iconMap[service.id] || UIUXServiceIcon;
            return (
              <div
                key={service.id}
                className="rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-sm p-6 sm:p-8 lg:p-10 xl:p-12 shadow-subtle hover:shadow-apple hover:border-blue-400/80 transition-all duration-300 flex flex-col items-center text-center justify-between group hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Top Subtle Hover Light Strip */}
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#1366FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col items-center w-full">
                  {/* 1. Professional Centered 3D Vector Icon */}
                  <div className="mb-6">
                    <Icon />
                  </div>

                  {/* 2. Service Title Directly Below the Icon */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#090D1A] group-hover:text-[#1366FF] transition-colors leading-snug mb-3">
                    {service.title}
                  </h3>

                  {/* 3. Concise Centered Description */}
                  <p className="text-xs sm:text-sm md:text-base text-[#525B75] leading-relaxed max-w-md mb-6 sm:mb-8">
                    {service.description}
                  </p>
                </div>

                {/* 4. Action Buttons Centered */}
                <div className="w-full flex flex-col items-center gap-2.5 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-3 px-5 rounded-full bg-slate-50 hover:bg-[#1366FF] text-[#1366FF] hover:text-white border border-slate-200 hover:border-transparent text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 group/btn"
                  >
                    <span>{t.exploreDetails}</span>
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1 ltr:rotate-180 ltr:group-hover/btn:translate-x-1" />
                  </button>

                  <a
                    href="#contact"
                    className="text-xs font-bold text-slate-500 hover:text-[#1366FF] transition-colors"
                  >
                    {t.requestDirectly}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-apple border border-slate-100 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 left-4 sm:top-5 sm:left-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors focus:outline-none"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#1366FF] border border-blue-200">
                {t.modalBadge}
              </span>
              <span className="text-xs text-slate-400">
                {t.expectedTimeline} {selectedService.details.timeline}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#090D1A] mb-3">
              {selectedService.title}
            </h3>

            <div className="space-y-4 sm:space-y-5 text-xs sm:text-sm text-[#525B75] leading-relaxed">
              <div>
                <h4 className="font-bold text-[#090D1A] text-sm sm:text-base mb-1.5">
                  {t.overviewTitle}
                </h4>
                <p>{selectedService.details.overview}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#090D1A] text-sm sm:text-base mb-2">
                  {t.featuresTitle}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.details.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[#090D1A]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#090D1A] text-sm sm:text-base mb-2">
                  {t.deliverablesTitle}
                </h4>
                <ul className="space-y-1.5">
                  {selectedService.details.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[#090D1A]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1366FF]" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#1366FF] to-[#252BFA] text-white text-xs font-bold hover:shadow-glow-sm transition-all text-center"
              >
                {t.requestViaWhatsApp}
              </a>
              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors text-center"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
