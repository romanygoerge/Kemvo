"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Mail, Globe, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

// WhatsApp Official SVG Icon
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="0"
      fill="currentColor"
      className={className}
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.186 1.564 5.938l-1.564 5.714 5.861-1.537c1.706.929 3.655 1.463 5.727 1.463 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const navT = translations[lang].navbar;

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-10 sm:pt-12 pb-8 sm:pb-10">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 pb-10 sm:pb-12 border-b border-slate-100">
          {/* Logo & Mission Column */}
          <div className="sm:col-span-2 md:col-span-5 flex flex-col gap-4">
            <Link href="#" className="flex items-center gap-2 group w-fit">
              <img
                src="/images/logo.png"
                alt="Kemvo Studio"
                className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#525B75] max-w-sm leading-relaxed mt-1">
              {t.mission}
            </p>

            <div className="flex items-center gap-2.5 sm:gap-3 pt-1">
              <a
                href="https://wa.me/201204062941"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-emerald-600 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@kemvo.studio"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#1366FF] flex items-center justify-center text-slate-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#1366FF] flex items-center justify-center text-slate-600 transition-colors"
                aria-label="Terminal"
              >
                <Terminal className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#1366FF] flex items-center justify-center text-slate-600 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="sm:col-span-1 md:col-span-2 flex flex-col gap-2.5 sm:gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
              {t.servicesTitle}
            </h4>
            <a
              href="#services"
              className="text-xs sm:text-sm text-[#525B75] hover:text-[#1366FF] transition-colors"
            >
              {lang === "ar" ? "تصميم واجهات UI/UX" : "UI/UX Design"}
            </a>
            <a
              href="#services"
              className="text-xs sm:text-sm text-[#525B75] hover:text-[#1366FF] transition-colors"
            >
              {lang === "ar" ? "تطوير تطبيقات الجوال" : "Mobile App Dev"}
            </a>
            <a
              href="#services"
              className="text-xs sm:text-sm text-[#525B75] hover:text-[#1366FF] transition-colors"
            >
              {lang === "ar" ? "المواقع ومنصات الويب" : "Web Platforms"}
            </a>
            <a
              href="#services"
              className="text-xs sm:text-sm text-[#525B75] hover:text-[#1366FF] transition-colors"
            >
              {lang === "ar" ? "أنظمة التصميم (Design Systems)" : "Design Systems"}
            </a>
          </div>

          {/* Links Col 2 */}
          <div className="sm:col-span-1 md:col-span-2 flex flex-col gap-2.5 sm:gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
              {t.studioTitle}
            </h4>
            <a
              href="#portfolio"
              className="text-xs sm:text-sm text-[#525B75] hover:text-[#1366FF] transition-colors"
            >
              {navT.portfolio}
            </a>
            <a
              href="#process"
              className="text-xs sm:text-sm text-[#525B75] hover:text-[#1366FF] transition-colors"
            >
              {navT.process}
            </a>
            <a
              href="#reviews"
              className="text-xs sm:text-sm text-[#525B75] hover:text-[#1366FF] transition-colors"
            >
              {navT.reviews}
            </a>
            <a
              href="#contact"
              className="text-xs sm:text-sm text-[#525B75] hover:text-[#1366FF] transition-colors"
            >
              {lang === "ar" ? "حجز استشارة عبر واتساب" : "Book via WhatsApp"}
            </a>
          </div>

          {/* Direct Contact Col 3 */}
          <div className="sm:col-span-2 md:col-span-3 flex flex-col gap-2.5 sm:gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
              {t.contactTitle}
            </h4>
            <a
              href="https://wa.me/201204062941"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-mono font-bold transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
              <span dir="ltr">+20 120 406 2941</span>
            </a>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#525B75]">
              <Mail className="w-4 h-4 text-[#1366FF] shrink-0" />
              <span className="font-mono">hello@kemvo.studio</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#525B75]">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{t.availableWorldwide}</span>
            </div>
            <div className="mt-1 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-xs text-emerald-800 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t.instantReply}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8] text-center sm:text-right ltr:sm:text-left">
          <p>{t.copyright}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <a href="#" className="hover:text-[#525B75] transition-colors">
              {t.privacy}
            </a>
            <a href="#" className="hover:text-[#525B75] transition-colors">
              {t.terms}
            </a>
            <span className="font-mono text-slate-400">
              {t.designedWith}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
