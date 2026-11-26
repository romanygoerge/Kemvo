import { z } from "zod";
import { LEAD_STATUSES } from "@/lib/supabase/types";

const optionalTrimmedString = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength)
    .optional()
    .nullable()
    .transform((val) => {
      if (!val) return null;
      const trimmed = val.trim();
      return trimmed.length > 0 ? trimmed : null;
    });

export const createLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "الاسم يجب أن يكون حرفين على الأقل")
    .max(120, "الاسم طويل جداً"),
  countryCode: z
    .string()
    .trim()
    .min(1)
    .max(8)
    .regex(/^\+[0-9]{0,6}$/, "كود الدولة غير صالح")
    .default("+20"),
  phone: z
    .string()
    .trim()
    .min(6, "رقم الهاتف غير مكتمل")
    .max(30, "رقم الهاتف طويل جداً"),
  email: z
    .union([
      z.literal(""),
      z.null(),
      z.undefined(),
      z.string().trim().max(254).email("صيغة البريد الإلكتروني غير صحيحة"),
    ])
    .transform((val) => {
      if (!val || typeof val !== "string") return null;
      const trimmed = val.trim().toLowerCase();
      return trimmed.length > 0 ? trimmed : null;
    }),
  serviceType: z
    .string()
    .trim()
    .min(2, "يرجى اختيار نوع الخدمة")
    .max(160),
  serviceSlug: optionalTrimmedString(100),
  projectDescription: optionalTrimmedString(4000),
  budget: optionalTrimmedString(100),
  locale: z.enum(["ar", "en"]).default("ar"),
  source: optionalTrimmedString(100),
  landingPage: optionalTrimmedString(1000),
  referrer: optionalTrimmedString(1000),
  utmSource: optionalTrimmedString(200),
  utmMedium: optionalTrimmedString(200),
  utmCampaign: optionalTrimmedString(250),
  utmContent: optionalTrimmedString(250),
  utmTerm: optionalTrimmedString(250),
  fbclid: optionalTrimmedString(500),
  fbp: optionalTrimmedString(255),
  fbc: optionalTrimmedString(500),
  idempotencyKey: optionalTrimmedString(120),
  // Honeypot anti-spam trap: must stay empty for real users
  website: z.string().optional().default(""),
});

export type CreateLeadInput = z.input<typeof createLeadSchema>;

export const updateLeadSchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  internalNotes: z.string().trim().max(5000).nullable().optional(),
  lastContactedAt: z.string().datetime({ offset: true }).nullable().optional(),
  logContact: z.boolean().optional(),
  newNote: z.string().trim().min(1).max(4000).optional(),
});

/**
 * Strips spaces/symbols and leading zeros from local phone input and formats international phone.
 */
export function formatInternationalPhone(
  countryCode: string,
  rawPhone: string
): { valid: boolean; formatted: string; digitsOnly: string } {
  const cleanedInput = rawPhone.trim();
  // If user pasted full international number starting with + or 00
  if (cleanedInput.startsWith("+") || cleanedInput.startsWith("00")) {
    const normalized = cleanedInput.replace(/^00/, "+").replace(/[^\d+]/g, "");
    const digitsOnly = normalized.replace(/\D/g, "");
    return {
      valid: digitsOnly.length >= 8 && digitsOnly.length <= 16,
      formatted: normalized,
      digitsOnly,
    };
  }

  const ccDigits = countryCode.replace(/\D/g, "");
  let localDigits = cleanedInput.replace(/\D/g, "");

  // Remove leading 0 if country code is provided (e.g. Egypt 012... -> +20 12...)
  if (ccDigits.length > 0 && localDigits.startsWith("0")) {
    localDigits = localDigits.replace(/^0+/, "");
  }

  const digitsOnly = `${ccDigits}${localDigits}`;
  const formatted = ccDigits ? `+${ccDigits}${localDigits}` : `+${localDigits}`;

  return {
    valid: localDigits.length >= 6 && digitsOnly.length >= 7 && digitsOnly.length <= 16,
    formatted,
    digitsOnly,
  };
}

/**
 * Builds the pre-filled Studio WhatsApp URL for a successfully saved lead.
 */
export function buildLeadWhatsAppUrl(params: {
  lang: "ar" | "en";
  refCode: string;
  name: string;
  phone: string;
  email: string | null;
  serviceType: string;
  budgetLabel?: string | null;
  projectDescription: string | null;
}): string {
  const targetWhatsApp = "201204062941";
  const {
    lang,
    refCode,
    name,
    phone,
    email,
    serviceType,
    budgetLabel,
    projectDescription,
  } = params;

  const message =
    lang === "ar"
      ? `*طلب استشارة وبدء مشروع جديد - Kemvo Studio* 🚀
🔖 *رقم المرجع:* ${refCode}
━━━━━━━━━━━━━━━━━━━━━━
👤 *الاسم الكامل:* ${name}
📱 *رقم الواتساب للتواصل:* ${phone}
📧 *البريد الإلكتروني:* ${email || "لم يُحدد"}
💼 *نوع المشروع:* ${serviceType}
💰 *الميزانية المتوقعة:* ${budgetLabel || "غير محدد"}
📝 *نبذة عن تفاصيل المشروع:*
${projectDescription || "سيتم مناقشتها تفصيلياً خلال المكالمة الاستشارية."}
━━━━━━━━━━━━━━━━━━━━━━
أرجو تأكيد موعد الاستشارة ومناقشة تفاصيل التنفيذ. شكراً لكم!`
      : `*Project Inquiry & Consultation Request - Kemvo Studio* 🚀
🔖 *Reference ID:* ${refCode}
━━━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${name}
📱 *WhatsApp Phone:* ${phone}
📧 *Email:* ${email || "Not specified"}
💼 *Project Type:* ${serviceType}
💰 *Estimated Budget:* ${budgetLabel || "Not specified"}
📝 *Project Overview:*
${projectDescription || "To be discussed during the consultation call."}
━━━━━━━━━━━━━━━━━━━━━━
Please confirm our consultation schedule and details. Thank you!`;

  return `https://wa.me/${targetWhatsApp}?text=${encodeURIComponent(message)}`;
}
