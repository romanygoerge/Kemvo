"use client";

import React, { useState } from "react";
import { ArrowLeft, X, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

// 1. High-End 3D Icon for UI/UX Design (Zero Shadow, Large & Clear)
function UIUXServiceIcon() {
  return (
    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-b from-white to-blue-50/50 border border-slate-200/90 flex items-center justify-center group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300">
      <img
        src="/images/service-3d-uiux.png"
        alt="تصميم واجهات وتجربة المستخدم 3D"
        className="w-22 h-22 sm:w-26 sm:h-26 object-contain rounded-2xl"
      />
    </div>
  );
}

// 2. High-End 3D Icon for Mobile Applications (Zero Shadow, Large & Clear)
function MobileServiceIcon() {
  return (
    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-b from-white to-sky-50/50 border border-slate-200/90 flex items-center justify-center group-hover:scale-105 group-hover:border-sky-400 transition-all duration-300">
      <img
        src="/images/service-3d-mobile.png"
        alt="تطوير تطبيقات الجوال 3D"
        className="w-22 h-22 sm:w-26 sm:h-26 object-contain rounded-2xl"
      />
    </div>
  );
}

// 3. High-End 3D Icon for Web Platforms (Zero Shadow, Large & Clear)
function WebServiceIcon() {
  return (
    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-b from-white to-indigo-50/50 border border-slate-200/90 flex items-center justify-center group-hover:scale-105 group-hover:border-indigo-400 transition-all duration-300">
      <img
        src="/images/service-3d-web.png"
        alt="تطوير المواقع والمنصات 3D"
        className="w-22 h-22 sm:w-26 sm:h-26 object-contain rounded-2xl"
      />
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
