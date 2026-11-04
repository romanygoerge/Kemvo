"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

// 1. Official Next.js Logo Component
function NextJsIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" width="36" height="36" fill="none" className={className}>
      <mask id="mask0_next" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#mask0_next)">
        <circle cx="90" cy="90" r="90" fill="#000" stroke="#334155" strokeWidth="4" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#paint0_linear_next)"
        />
        <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_next)" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_next" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_next" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 2. Official Swift Logo Component
function SwiftIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" width="36" height="36" className={className}>
      <defs>
        <linearGradient id="swift_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FA7343" />
          <stop offset="100%" stopColor="#EA2E24" />
        </linearGradient>
      </defs>
      <path
        fill="url(#swift_grad)"
        d="M24.8 110.4c17.5 13.9 44.9 17.5 70.1 7.4-14.7-5.9-26.6-16.7-33.8-30.3 32 15.6 62.4-1.9 66.9-20.9-1.9 1.4-5.3 3.6-7.9 4.8 11.2-12.7 8.3-33.4 3.7-44.1-1.3 7.8-5.3 14.7-10.4 19.3 2.1-12.1-4.7-27.4-12.8-35.3 2.5 7.8 1.8 17.2-2.3 23.4C93.4 25.1 82 17.2 70.1 11.8c2.4 8.7 1.8 16.5-2.2 24.3-7.5-6.8-17.6-11.4-27.9-12.3 4.2 7.7 5.7 15.7 2.4 23.6-7.5-6.5-17.6-9.9-27.9-9.9 4.3 6.6 6.3 13.7 4.1 21.3C11.9 54.4 6 49.3 0 46.2c.4 5.3 3.1 10.7 7.7 15.8-9.4-4.8-19.4-7.2-29.3-7.2 6.8 9.3 16.5 17.1 27.6 21.6-9.3-1.6-18.7-1-27.6 1.8 11.3 13.6 28.5 24 46.4 32.2z"
      />
    </svg>
  );
}

// 3. Official Flutter Logo Component
function FlutterIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 166 202" width="30" height="36" fill="none" className={className}>
      <path d="M100.2 0L0 100.2l31.2 31.2L162.6 0h-62.4z" fill="#47C5FB" />
      <path d="M100.2 101.4L44.8 156.8l31.2 31.2 24.2-24.2 62.4-62.4h-62.4z" fill="#47C5FB" />
      <path d="M76 188l24.2 24.2h62.4l-55.4-55.4-31.2 31.2z" fill="#00569E" />
      <path d="M44.8 156.8l31.2-31.2 31.2 31.2-31.2 31.2z" fill="#00B5F8" />
    </svg>
  );
}

// 4. Official Tailwind CSS Logo Component
function TailwindIcon({ className = "w-9 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 33" width="36" height="22" fill="none" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.005-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
        fill="#38BDF8"
      />
    </svg>
  );
}

// 5. Official TypeScript Logo Component
function TypeScriptIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" width="34" height="34" className={className}>
      <rect width="128" height="128" rx="20" fill="#3178C6" />
      <path
        d="M37.5 50.5H59.5V58H50.5V94H41.5V58H37.5V50.5Z"
        fill="white"
      />
      <path
        d="M68 86.5C71 91.5 77 94.5 85 94.5C94 94.5 99.5 89.5 99.5 83C99.5 76.5 94.5 72.5 84.5 69.5C77.5 67 75 64.5 75 61C75 57 78.5 54 84 54C89 54 93.5 56.5 96 60L101.5 54.5C97.5 49.5 91.5 46.5 84 46.5C74 46.5 66.5 52.5 66.5 61.5C66.5 68 71 72 81 75.5C88.5 78 91 80.5 91 84C91 88.5 87 91.5 81 91.5C74.5 91.5 69.5 88 66 82.5L68 86.5Z"
        fill="white"
      />
    </svg>
  );
}

// 6. Official Figma Logo Component
function FigmaIcon({ className = "w-6 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 57" width="24" height="36" fill="none" className={className}>
      <path d="M19 28.5A9.5 9.5 0 0 1 28.5 19H38v9.5a9.5 9.5 0 0 1-9.5 9.5H19v-9.5z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  );
}

export default function TechStackSection() {
  const { lang } = useLanguage();
  const t = translations[lang].techStack;

  const stack = [
    {
      name: "Next.js 15",
      subtitle: lang === "ar" ? "معمارية الويب الحديثة" : "Web Architecture",
      badge: lang === "ar" ? "رندرة سيرفر و SSR" : "App Router & SSR",
      icon: NextJsIcon,
      accentColor: "group-hover:border-slate-300",
      glowBg: "group-hover:bg-white/10",
      glowAura: "from-white/15 to-transparent",
    },
    {
      name: "Swift",
      subtitle: lang === "ar" ? "محرك iOS أصلي" : "iOS Native Engine",
      badge: lang === "ar" ? "معالجات آبل و SwiftUI" : "Apple Silicon & SwiftUI",
      icon: SwiftIcon,
      accentColor: "group-hover:border-orange-500",
      glowBg: "group-hover:bg-orange-500/10",
      glowAura: "from-orange-500/20 to-transparent",
    },
    {
      name: "Flutter 3",
      subtitle: lang === "ar" ? "تطوير متعدد المنصات" : "Multiplatform SDK",
      badge: lang === "ar" ? "كود Dart عالي الأداء" : "High-Performance Dart",
      icon: FlutterIcon,
      accentColor: "group-hover:border-cyan-400",
      glowBg: "group-hover:bg-cyan-500/10",
      glowAura: "from-cyan-500/20 to-transparent",
    },
    {
      name: "Tailwind CSS",
      subtitle: lang === "ar" ? "نظام تنسيق عصري" : "Modern CSS System",
      badge: lang === "ar" ? "محرك Tailwind v4" : "Tailwind v4 Engine",
      icon: TailwindIcon,
      accentColor: "group-hover:border-sky-400",
      glowBg: "group-hover:bg-sky-500/10",
      glowAura: "from-sky-500/20 to-transparent",
    },
    {
      name: "TypeScript",
      subtitle: lang === "ar" ? "أمان كود برمجي فائق" : "Strict Type Safety",
      badge: lang === "ar" ? "معايير شركات كبرى" : "Type-Safe Enterprise",
      icon: TypeScriptIcon,
      accentColor: "group-hover:border-blue-500",
      glowBg: "group-hover:bg-blue-600/10",
      glowAura: "from-blue-600/20 to-transparent",
    },
    {
      name: "Figma",
      subtitle: lang === "ar" ? "رموز وتخطيط تفاعلي" : "Tokens & Auto-Layout",
      badge: lang === "ar" ? "أنظمة تصميم متكاملة" : "Design Systems & UI",
      icon: FigmaIcon,
      accentColor: "group-hover:border-purple-400",
      glowBg: "group-hover:bg-purple-500/10",
      glowAura: "from-purple-500/20 to-transparent",
    },
  ];

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-[#060A18] text-white relative overflow-hidden" id="stack">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#1366FF]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#00C6FF]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
          {t.headline}
        </h2>

        <p className="text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base mb-8 sm:mb-10 leading-relaxed">
          {t.description}
        </p>

        {/* 6 High-Fidelity Official Tech Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {stack.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className={`p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:bg-slate-850 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-apple group relative overflow-hidden min-h-[190px] sm:min-h-[210px] md:min-h-[220px] ${item.accentColor}`}
              >
                {/* Radial Glow on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${item.glowAura}`}
                />

                {/* Official Icon Container with soft background */}
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-center p-2.5 sm:p-3 shadow-inner group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <Icon />
                </div>

                {/* Typography & Brand Info */}
                <div className="relative z-10 mt-3 sm:mt-4 flex flex-col items-center w-full">
                  <span className="text-base sm:text-lg font-bold font-mono text-white tracking-tight group-hover:text-blue-100 transition-colors truncate max-w-full">
                    {item.name}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5 sm:mt-1 truncate max-w-full">
                    {item.subtitle}
                  </span>
                </div>

                {/* Micro Category Pill */}
                <div className="relative z-10 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-800/80 w-full">
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-200 transition-colors block truncate">
                    {item.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
