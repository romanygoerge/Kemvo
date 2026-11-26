export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "proposal_sent",
  "won",
  "lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_META: Record<
  LeadStatus,
  {
    labelAr: string;
    labelEn: string;
    badgeClass: string;
  }
> = {
  new: {
    labelAr: "طلب جديد",
    labelEn: "New",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
  contacted: {
    labelAr: "تم التواصل",
    labelEn: "Contacted",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
  },
  qualified: {
    labelAr: "عميل مؤهل",
    labelEn: "Qualified",
    badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  proposal_sent: {
    labelAr: "تم إرسال العرض",
    labelEn: "Proposal Sent",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  won: {
    labelAr: "تم التعاقد",
    labelEn: "Won",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  lost: {
    labelAr: "غير مكتمل / مرفوض",
    labelEn: "Lost",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
  },
};

export interface LeadRecord {
  id: string;
  ref_code: string;
  name: string;
  email: string | null;
  country_code: string;
  phone: string;
  service_type: string;
  service_slug: string | null;
  project_description: string | null;
  budget: string | null;
  status: LeadStatus;
  internal_notes: string | null;
  last_contacted_at: string | null;
  source: string;
  landing_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  fbclid: string | null;
  fbp: string | null;
  fbc: string | null;
  locale: "ar" | "en";
  created_at: string;
  updated_at: string;
}

export interface LeadNoteRecord {
  id: string;
  lead_id: string;
  note: string;
  note_type: "note" | "status_change" | "contact_log";
  created_by: string | null;
  created_by_email: string | null;
  created_at: string;
}

export interface LeadStats {
  total: number;
  byStatus: Record<LeadStatus, number>;
  byService: { name: string; count: number }[];
  bySource: { name: string; count: number }[];
}
