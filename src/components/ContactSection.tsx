"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

// WhatsApp Official SVG Icon
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="0"
      fill="currentColor"
      className={className}
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.186 1.564 5.938l-1.564 5.714 5.861-1.537c1.706.929 3.655 1.463 5.727 1.463 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function ContactSection() {
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+20",
    phone: "",
    email: "",
    projectType: t.projectTypeOptions[0],
    notes: "",
  });

  const countryCodes = [
    { code: "+20", label: lang === "ar" ? "مصر (+20)" : "Egypt (+20)" },
    { code: "+966", label: lang === "ar" ? "السعودية (+966)" : "Saudi Arabia (+966)" },
    { code: "+971", label: lang === "ar" ? "الإمارات (+971)" : "UAE (+971)" },
    { code: "+965", label: lang === "ar" ? "الكويت (+965)" : "Kuwait (+965)" },
    { code: "+974", label: lang === "ar" ? "قطر (+974)" : "Qatar (+974)" },
    { code: "+968", label: lang === "ar" ? "عمان (+968)" : "Oman (+968)" },
    { code: "+973", label: lang === "ar" ? "البحرين (+973)" : "Bahrain (+973)" },
    { code: "+962", label: lang === "ar" ? "الأردن (+962)" : "Jordan (+962)" },
    { code: "+964", label: lang === "ar" ? "العراق (+964)" : "Iraq (+964)" },
    { code: "+1", label: lang === "ar" ? "أمريكا / كندا (+1)" : "USA / Canada (+1)" },
    { code: "+44", label: lang === "ar" ? "المملكة المتحدة (+44)" : "UK (+44)" },
    { code: "+49", label: lang === "ar" ? "ألمانيا (+49)" : "Germany (+49)" },
    { code: "+", label: lang === "ar" ? "دولة أخرى (+)" : "Other Country (+)" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Target Studio WhatsApp Number (in international format without +)
    const targetWhatsApp = "201204062941";

    const cleanPhone = formData.phone.trim().replace(/^0+/, "");
    const fullPhone = `${formData.countryCode} ${cleanPhone}`;

    // Multilingual WhatsApp message
    const message =
      lang === "ar"
        ? `*طلب استشارة وبدء مشروع جديد - Kemvo Studio* 🚀
━━━━━━━━━━━━━━━━━━━━━━
👤 *الاسم الكامل:* ${formData.name.trim()}
📱 *رقم الواتساب للتواصل:* ${fullPhone}
📧 *البريد الإلكتروني:* ${formData.email.trim() || "لم يُحدد"}
💼 *نوع المشروع:* ${formData.projectType}
📝 *نبذة عن تفاصيل المشروع:*
${formData.notes.trim() || "سيتم مناقشتها تفصيلياً خلال المكالمة الاستشارية."}
━━━━━━━━━━━━━━━━━━━━━━
أرجو تأكيد موعد الاستشارة ومناقشة تفاصيل التنفيذ. شكراً لكم!`
        : `*Project Inquiry & Consultation Request - Kemvo Studio* 🚀
━━━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${formData.name.trim()}
📱 *WhatsApp Phone:* ${fullPhone}
📧 *Email:* ${formData.email.trim() || "Not specified"}
💼 *Project Type:* ${formData.projectType}
📝 *Project Overview:*
${formData.notes.trim() || "To be discussed during the consultation call."}
━━━━━━━━━━━━━━━━━━━━━━
Please confirm our consultation schedule and details. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetWhatsApp}?text=${encodedMessage}`;

    setLastWhatsAppUrl(whatsappUrl);
    setSubmitted(true);

    // Automatically trigger WhatsApp in a new tab
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <section className="py-10 sm:py-14 md:py-16 relative" id="contact">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Curved Gradient Canvas */}
        <div className="relative rounded-2xl sm:rounded-3xl md:rounded-[40px] bg-gradient-to-br from-slate-950 via-[#0B192C] to-[#002D80] p-5 sm:p-8 md:p-12 lg:p-16 text-white overflow-hidden shadow-floating border border-slate-800">
          {/* Ambient Glows */}
          <div className="absolute -top-32 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-[#1366FF]/30 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-[#25D366]/20 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Narrative Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold backdrop-blur-md w-fit border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span>{lang === "ar" ? "تواصل فوري ومباشر عبر واتساب" : "Direct & Instant WhatsApp Chat"}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {t.headline}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                {t.description}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2.5 sm:gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.badgeNda}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.badgeArch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.badgeReply}</span>
                </div>
              </div>

              {/* Direct WhatsApp Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href="https://wa.me/201204062941"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold transition-all shrink-0"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>+20 120 406 2941</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400 ml-1" />
                </a>
                <span className="text-xs text-slate-400">
                  {t.whatsappPill}
                </span>
              </div>
            </div>

            {/* WhatsApp Booking Form Card */}
            <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl text-[#090D1A]">
              {submitted ? (
                <div className="py-6 sm:py-8 text-center flex flex-col items-center gap-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#090D1A]">
                    {t.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525B75] max-w-sm leading-relaxed">
                    {t.successDesc}
                  </p>

                  <a
                    href={lastWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 sm:py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>{t.continueWhatsApp}</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    {t.editData}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg sm:text-xl font-bold text-[#090D1A]">
                      {t.formTitle}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {t.formOnline}
                    </div>
                  </div>
                  <p className="text-xs text-[#525B75] mb-4 sm:mb-5">
                    {t.formSub}
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-3.5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.nameLabel} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder={t.namePlaceholder}
                        className="w-full text-base sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>

                    {/* WhatsApp Phone with Country Code Selector */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.phoneLabel} <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.countryCode}
                          onChange={(e) =>
                            setFormData({ ...formData, countryCode: e.target.value })
                          }
                          className="w-32 sm:w-36 shrink-0 text-xs px-2 sm:px-2.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-slate-700 font-semibold"
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder={t.phonePlaceholder}
                          className="flex-1 min-w-0 text-base sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono transition-all text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    {/* Professional Email (Optional) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.emailLabel}{" "}
                        <span className="text-slate-400 font-normal">
                          {t.emailOptional}
                        </span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder={t.emailPlaceholder}
                        className="w-full text-base sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono transition-all text-left"
                        dir="ltr"
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.projectTypeLabel} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({ ...formData, projectType: e.target.value })
                        }
                        className="w-full text-xs sm:text-sm px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-700 font-medium"
                      >
                        {t.projectTypeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Project Notes */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.notesLabel}{" "}
                        <span className="text-slate-400 font-normal">
                          {t.notesOptional}
                        </span>
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder={t.notesPlaceholder}
                        className="w-full text-base sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                      />
                    </div>

                    {/* Submit via WhatsApp Button */}
                    <button
                      type="submit"
                      className="w-full mt-1.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-[#25D366] to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 group active:scale-98"
                    >
                      <WhatsAppIcon className="w-5 h-5 text-white" />
                      <span>{t.submitButton}</span>
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
