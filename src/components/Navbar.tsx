"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = translations[lang].navbar;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.services, href: "/#services" },
    { name: t.portfolio, href: "/#portfolio" },
    { name: t.process, href: "/#process" },
    { name: lang === "ar" ? "الأسئلة الشائعة" : "FAQs", href: "/#faq" },
    { name: t.reviews, href: "/#reviews" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 px-2.5 sm:px-4 md:px-8 ${
        scrolled ? "pt-2" : "pt-3 sm:pt-4"
      }`}
    >
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1520px] mx-auto glass-nav rounded-2xl md:rounded-full border border-slate-200/80 shadow-subtle px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between transition-all">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0" aria-label="Kemvo Studio Home">
          <img
            src="/images/logo.png"
            alt="Kemvo Studio | استوديو تصميم وتطوير التطبيقات والمواقع"
            width={120}
            height={40}
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
          />

          <div className="hidden sm:flex items-center gap-1.5 border-r ltr:border-r-0 ltr:border-l border-slate-200 pr-3 ltr:pr-0 ltr:pl-3 mr-1 ltr:mr-0 ltr:ml-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-[#525B75] font-medium tracking-tight">
              {t.status}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-2 text-sm font-semibold text-[#525B75] hover:text-[#1366FF] hover:bg-blue-50/60 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action & Language CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Toggle */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-full text-xs font-semibold border border-slate-200/60">
            <button
              onClick={() => setLang("ar")}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                lang === "ar"
                  ? "bg-white text-[#1366FF] shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 sm:px-2.5 py-1 rounded-full transition-all ${
                lang === "en"
                  ? "bg-white text-[#1366FF] shadow-xs font-bold"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              EN
            </button>
          </div>

          {/* Primary CTA Button */}
          <a
            href="#contact"
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#1366FF] to-[#252BFA] hover:from-[#0052E0] hover:to-[#1A20EA] text-white font-semibold text-xs sm:text-sm transition-all duration-300 shadow-glow-sm hover:shadow-glow active:scale-95 group shrink-0"
          >
            <span>{t.cta}</span>
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100/90 flex items-center justify-center text-slate-700 hover:bg-slate-200 focus:outline-none transition-colors"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 sm:p-5 rounded-2xl glass-card border border-slate-200/90 shadow-apple animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <span className="text-xs font-bold text-[#525B75]">{t.menu}</span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.available}
            </div>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-sm font-semibold text-[#090D1A] hover:text-[#1366FF] hover:bg-blue-50/70 rounded-xl transition-colors flex items-center justify-between"
            >
              <span>{link.name}</span>
              <ArrowLeft className="w-4 h-4 text-slate-400 ltr:rotate-180" />
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">{t.language}</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setLang("ar")}
                className={`px-3 py-1 rounded-md ${
                  lang === "ar" ? "bg-white text-[#1366FF] shadow-xs" : "text-slate-500"
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-md ${
                  lang === "en" ? "bg-white text-[#1366FF] shadow-xs" : "text-slate-400"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

