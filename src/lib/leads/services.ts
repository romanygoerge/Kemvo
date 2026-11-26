export interface ServiceOption {
  slug: string;
  labelAr: string;
  labelEn: string;
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    slug: "ui-ux-design",
    labelAr: "تصميم واجهات وتجربة المستخدم (UI/UX Design)",
    labelEn: "UI/UX Design & User Experience",
  },
  {
    slug: "mobile-app-development",
    labelAr: "تطوير وتصميم تطبيقات الجوال (iOS & Android)",
    labelEn: "Mobile App Development (iOS & Android)",
  },
  {
    slug: "flutter-app-development",
    labelAr: "تطوير تطبيقات Flutter متعددة المنصات",
    labelEn: "Cross-Platform Flutter App Development",
  },
  {
    slug: "web-development",
    labelAr: "تصميم وتطوير موقع أو منصة ويب بـ Next.js",
    labelEn: "Web Platform & Admin Dashboard (Next.js)",
  },
  {
    slug: "custom-software-development",
    labelAr: "تطوير برمجيات وأنظمة مخصصة للشركات",
    labelEn: "Custom Software & Enterprise Systems",
  },
  {
    slug: "design-system",
    labelAr: "بناء وتوثيق Design System متكامل للشركات",
    labelEn: "Enterprise Design System & Token Architecture",
  },
  {
    slug: "technical-consultation",
    labelAr: "استشارة تقنية وهندسية شاملة لمشروع قائم",
    labelEn: "Technical Consultation for Existing Workload",
  },
];

export const BUDGET_OPTIONS = [
  {
    value: "under_3k",
    labelAr: "أقل من $3,000",
    labelEn: "Under $3,000",
  },
  {
    value: "3k_8k",
    labelAr: "$3,000 – $8,000",
    labelEn: "$3,000 – $8,000",
  },
  {
    value: "8k_20k",
    labelAr: "$8,000 – $20,000",
    labelEn: "$8,000 – $20,000",
  },
  {
    value: "above_20k",
    labelAr: "أكثر من $20,000",
    labelEn: "$20,000+",
  },
  {
    value: "undecided",
    labelAr: "لم أحدد الميزانية بعد",
    labelEn: "Not decided yet",
  },
] as const;

export function resolveServiceBySlug(
  slug: string | null | undefined
): ServiceOption | undefined {
  if (!slug) return undefined;
  return SERVICE_OPTIONS.find((item) => item.slug === slug);
}

export function resolveSlugByLabel(label: string): string | null {
  const normalized = label.trim().toLowerCase();
  const found = SERVICE_OPTIONS.find(
    (item) =>
      item.labelAr.toLowerCase() === normalized ||
      item.labelEn.toLowerCase() === normalized ||
      item.slug.toLowerCase() === normalized
  );
  return found ? found.slug : null;
}

export function getBudgetLabel(
  budgetValue: string | null | undefined,
  lang: "ar" | "en"
): string {
  if (!budgetValue) return lang === "ar" ? "غير محدد" : "Not specified";
  const match = BUDGET_OPTIONS.find(
    (b) => b.value === budgetValue || b.labelAr === budgetValue || b.labelEn === budgetValue
  );
  if (!match) return budgetValue;
  return lang === "ar" ? match.labelAr : match.labelEn;
}
