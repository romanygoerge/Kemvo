"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FAQItem {
  q: string;
  a: string;
}

const faqsAr: FAQItem[] = [
  {
    q: "كم تكلفة إنشاء وتطوير تطبيق موبايل (Android & iOS)؟",
    a: "تعتمد تكلفة إنشاء وتطوير تطبيق الموبايل على عدة عوامل هندسية أساسية: حجم الميزات، نوع التطبيق (تطبيق تجارة إلكترونية، توصيل، منصة مالية، أو شبكة اجتماعية)، والتقنية المختارة (Flutter أو Native). في كيمفو ستوديو، نبدأ بنطاق MVP مدروس يبدأ من تكاليف اقتصادية واضحة وبأسعار ثابتة تشمل التصميم والبرمجة وربط الخوادم ورفع التطبيق للمتاجر دون أي رسوم خفية.",
  },
  {
    q: "كم يستغرق وقت تطوير وبرمجة تطبيق جوال أو موقع إلكتروني؟",
    a: "تتراوح المدة الزمنية عادة بين 4 إلى 8 أسابيع للنسخة الأولية (MVP) من التطبيقات والمواقع المتطورة، بينما تستغرق المنظومات الضخمة ومتعددة الواجهات بين 10 إلى 16 أسبوعاً. نعتمد منهجية Agile مع تسليمات مرحلية كل أسبوعين تتيح لك اختبار كل جزء على جهازك الفعلي قبل الإطلاق.",
  },
  {
    q: "ما هو الفرق بين تطبيقات Flutter والتطبيقات الأصلية (Native)؟",
    a: "تقنية Flutter تتيح بناء كود برمجي موحد فائق الأداء يعمل بكفاءة تامة (60-120 FPS) على كل من iPhone (iOS) وأجهزة Android بنفس الوقت، مما يوفر ما يصل إلى 40% من تكلفة ووقت التطوير. بينما التطوير الأصلي (Native Swift / Kotlin) نستخدمه عندما يتطلب المشروع تكاملاً عميقاً جداً مع العتاد الحساس لأجهزة Apple أو مكتبات خاصة بالأجهزة الذكية.",
  },
  {
    q: "هل تتولى كيمفو ستوديو رفع واعتماد التطبيق على متجري Google Play و App Store؟",
    a: "نعم، بالتأكيد. فريقنا يتولى مسار النشر والاعتماد كاملاً: إعداد حسابات المطورين، تهيئة الشاشات والأيقونات ومعايير الخصوصية وفق اشتراطات Apple و Google الصارمة، وإدارة مرحلة المراجعة حتى يصبح تطبيقك متاحاً للتحميل ومطابقاً لمعايير التوافق الدولية.",
  },
  {
    q: "هل أحصل على الكود المصدري (Source Code) وملكية التطبيق كاملة؟",
    a: "نعم 100%. عند انتهاء المشروع وتسليمه، تنتقل الملكية الفكرية الكاملة والكود المصدري النظيف الموثق، بالإضافة لكافة ملفات التصميم (Figma) وحسابات الخوادم السحابية باسم مؤسستك أو شركتك مباشرة وبشكل قانوني كامل.",
  },
  {
    q: "هل تقدمون خدمات الدعم الفني والصيانة بعد إطلاق التطبيق؟",
    a: "نقدم ضماناً تشغيلياً مجانياً بعد الإطلاق لمعالجة أي ملاحظات، بالإضافة إلى باقات صيانة شهرية وسنوية مرنة تشمل: مراقبة أداء السيرفرات وقواعد البيانات 24/7، التحديثات الأمنية الدورية، وضمان استمرار توافق التطبيق مع أحدث إصدارات نظامي iOS و Android.",
  },
];

const faqsEn: FAQItem[] = [
  {
    q: "How much does it cost to develop a mobile application (iOS & Android)?",
    a: "The cost depends on scope, complexity, third-party integrations, and architectural requirements. At Kemvo Studio, we prioritize cost-efficient MVP execution using modern Flutter and Next.js stacks, providing transparent, fixed-price contracts that include UI/UX design, full-stack engineering, cloud infrastructure, and store deployment.",
  },
  {
    q: "How long does it take to design and build a mobile app or website?",
    a: "A production-ready Minimum Viable Product (MVP) typically takes 4 to 8 weeks. Larger platforms with custom backends and real-time APIs take 10 to 16 weeks. We follow 2-week agile sprint cycles with continuous TestFlight and APK test builds delivered straight to your devices.",
  },
  {
    q: "What is the difference between Flutter and Native (Swift/Kotlin) development?",
    a: "Flutter allows engineering a single high-performance codebase that runs natively at 60–120 FPS across both iOS and Android, slashing time-to-market and maintenance costs by up to 40%. Native Swift/Kotlin is utilized when custom hardware integrations or platform-specific lower-level APIs are mandatory.",
  },
  {
    q: "Does Kemvo Studio handle App Store and Google Play deployment?",
    a: "Yes, completely. We manage developer account setup, store listing graphics, metadata optimization (ASO), privacy policy compliance, and the official submission review process until your app is live and approved for global users.",
  },
  {
    q: "Do I own 100% of the source code and design assets upon completion?",
    a: "Yes. Upon project handover, complete intellectual property, documented source code repositories (GitHub/GitLab), Figma design systems, and cloud configurations are fully transferred to your company with zero lock-in.",
  },
  {
    q: "Do you offer post-launch maintenance, updates, and server monitoring?",
    a: "We provide an initial warranty period post-launch, alongside ongoing maintenance SLA contracts covering 24/7 server health monitoring, security patches, performance tuning, and updates for new iOS and Android OS releases.",
  },
];

export default function FAQSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = isAr ? faqsAr : faqsEn;

  const toggleQuestion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Structured Data (FAQPage JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section
      className="py-14 sm:py-20 md:py-24 bg-[#FAFCFF] relative border-t border-slate-200/70"
      id="faq"
    >
      {/* FAQPage JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1366FF] border border-blue-200/80 text-xs font-bold mb-3 sm:mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#1366FF]" />
            <span>
              {isAr ? "إجابات الأسئلة الشائعة" : "Knowledge & FAQs"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#090D1A] tracking-tight leading-tight">
            {isAr
              ? "الأسئلة الشائعة حول برمجة وتطوير التطبيقات"
              : "Frequently Asked Questions"}
          </h2>

          <p className="text-[#525B75] text-sm sm:text-base md:text-lg mt-3 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "كل ما تحتاج معرفته حول تكلفة التطوير، المدد الزمنية، معايير الجودة، وكيفية بدء مشروعك الرقمي بنجاح مع كيمفو ستوديو."
              : "Everything you need to know about app development costs, timelines, technology stacks, and partnering with Kemvo Studio."}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-blue-300 shadow-apple"
                    : "bg-white/80 hover:bg-white border-slate-200/80 shadow-xs"
                }`}
              >
                <button
                  onClick={() => toggleQuestion(idx)}
                  className="w-full text-start p-4 sm:p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base md:text-lg font-bold text-[#090D1A] leading-snug">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-blue-50 text-[#1366FF] rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-0 text-xs sm:text-sm md:text-base text-[#525B75] leading-relaxed border-t border-slate-100 mt-1 pt-3 animate-in fade-in duration-200">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Prompt */}
        <div className="mt-10 sm:mt-12 text-center p-6 rounded-3xl bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 border border-blue-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-start">
            <h4 className="text-sm sm:text-base font-bold text-[#090D1A]">
              {isAr ? "هل لديك سؤال أو استفسار مخصص؟" : "Have a specific question about your app?"}
            </h4>
            <p className="text-xs sm:text-sm text-[#525B75] mt-0.5">
              {isAr
                ? "تحدث مباشرة مع مستشارنا التقني عبر واتساب لمناقشة فكرتك مجاناً."
                : "Chat directly with our lead solution architect on WhatsApp for a free strategy session."}
            </p>
          </div>

          <a
            href="https://wa.me/201204062941"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1366FF] hover:bg-[#0052E0] text-white text-xs sm:text-sm font-bold shadow-glow-sm hover:shadow-glow transition-all shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{isAr ? "محادثة فورية عبر واتساب" : "Chat on WhatsApp"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
