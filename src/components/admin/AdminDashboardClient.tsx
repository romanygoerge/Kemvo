"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Globe,
  Loader2,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { getBudgetLabel, SERVICE_OPTIONS } from "@/lib/leads/services";
import {
  LEAD_STATUS_META,
  LEAD_STATUSES,
  type LeadNoteRecord,
  type LeadRecord,
  type LeadStats,
  type LeadStatus,
} from "@/lib/supabase/types";

interface AdminDashboardClientProps {
  adminEmail: string;
  initialLeads: LeadRecord[];
  initialStats: LeadStats;
}

function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "لم يتم بعد";
  try {
    return new Intl.DateTimeFormat("ar-EG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function AdminDashboardClient({
  adminEmail,
  initialLeads,
  initialStats,
}: AdminDashboardClientProps) {
  const router = useRouter();

  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [stats, setStats] = useState<LeadStats>(initialStats);
  const [loadingList, setLoadingList] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<string>("");
  const [sourceFilter, setSourceFilter] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // Selected lead detail state
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [leadNotes, setLeadNotes] = useState<LeadNoteRecord[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [savingUpdate, setSavingUpdate] = useState(false);
  const [detailStatus, setDetailStatus] = useState<LeadStatus>("new");
  const [detailInternalNotes, setDetailInternalNotes] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoadingList(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set("q", searchQuery.trim());
      if (statusFilter) params.set("status", statusFilter);
      if (serviceFilter) params.set("service", serviceFilter);
      if (sourceFilter) params.set("source", sourceFilter);
      if (dateFrom) params.set("from", dateFrom);
      if (dateTo) params.set("to", dateTo);

      const res = await fetch(`/api/admin/leads?${params.toString()}`, {
        cache: "no-store",
      });

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        if (data.stats) setStats(data.stats);
      }
    } finally {
      setLoadingList(false);
    }
  }, [
    searchQuery,
    statusFilter,
    serviceFilter,
    sourceFilter,
    dateFrom,
    dateTo,
    router,
  ]);

  // Debounced auto-fetch when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchLeads();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchLeads]);

  const openLeadDetail = async (lead: LeadRecord) => {
    setSelectedLead(lead);
    setDetailStatus(lead.status);
    setDetailInternalNotes(lead.internal_notes || "");
    setNewNoteText("");
    setFeedbackMsg(null);
    setLoadingDetails(true);

    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.lead) {
          setSelectedLead(data.lead);
          setDetailStatus(data.lead.status);
          setDetailInternalNotes(data.lead.internal_notes || "");
        }
        setLeadNotes(data.notes || []);
      }
    } finally {
      setLoadingDetails(false);
    }
  };

  const handlePatchLead = async (payload: {
    status?: LeadStatus;
    internalNotes?: string | null;
    logContact?: boolean;
    newNote?: string;
  }) => {
    if (!selectedLead || savingUpdate) return;
    setSavingUpdate(true);
    setFeedbackMsg(null);

    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = await res.json().catch(() => null);
      if (res.ok && data?.lead) {
        setSelectedLead(data.lead);
        setDetailStatus(data.lead.status);
        setDetailInternalNotes(data.lead.internal_notes || "");
        setLeadNotes(data.notes || []);
        if (payload.newNote) setNewNoteText("");
        setFeedbackMsg("تم حفظ التحديث بنجاح");
        void fetchLeads();
      } else {
        setFeedbackMsg(data?.error || "تعذر حفظ التعديلات");
      }
    } finally {
      setSavingUpdate(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setServiceFilter("");
    setSourceFilter("");
    setDateFrom("");
    setDateTo("");
  };

  const winRate =
    stats.total > 0
      ? ((stats.byStatus.won / stats.total) * 100).toFixed(1)
      : "0.0";

  const uniqueServiceNames = Array.from(
    new Set([
      ...SERVICE_OPTIONS.map((s) => s.labelAr),
      ...stats.byService.map((s) => s.name),
    ])
  );

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-[#090D1A]" dir="rtl">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1366FF] to-[#252BFA] text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-[#090D1A]">
                لوحة إدارة العملاء (Kemvo CRM)
              </h1>
              <p className="text-[11px] text-slate-500 font-mono truncate max-w-[220px] sm:max-w-none">
                {adminEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => void fetchLeads()}
              disabled={loadingList}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loadingList ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">تحديث</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1366FF] text-xs font-bold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">الموقع</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Top KPI Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
              <span>إجمالي الطلبات</span>
              <Users className="w-4 h-4 text-[#1366FF]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#090D1A]">
              {stats.total}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
              <span>طلبات جديدة</span>
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">
              {stats.byStatus.new}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
              <span>عملاء مؤهلون</span>
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700">
              {stats.byStatus.qualified}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-2">
              <span>تعاقدات ناجحة</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {stats.byStatus.won}
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#090D1A] to-[#0E1E42] text-white shadow-xs">
            <div className="flex items-center justify-between text-slate-300 text-xs font-bold mb-2">
              <span>معدل الإغلاق (Won)</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
              {winRate}%
            </div>
          </div>
        </section>

        {/* Breakdown Panels: By Status, By Service, By Source */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Status Breakdown */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <h2 className="text-xs font-extrabold text-slate-700 mb-3">
              التوزيع حسب الحالة
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {LEAD_STATUSES.map((st) => {
                const meta = LEAD_STATUS_META[st];
                const active = statusFilter === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(active ? "" : st)}
                    className={`p-2.5 rounded-xl border text-start transition-all cursor-pointer flex items-center justify-between ${
                      active
                        ? "border-[#1366FF] bg-blue-50/70 ring-1 ring-[#1366FF]"
                        : "border-slate-100 bg-slate-50/60 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-[11px] font-bold text-slate-700">
                      {meta.labelAr}
                    </span>
                    <span className="text-xs font-extrabold font-mono text-[#090D1A]">
                      {stats.byStatus[st]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service Breakdown */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <h2 className="text-xs font-extrabold text-slate-700 mb-3">
              الطلبات حسب الخدمة
            </h2>
            {stats.byService.length === 0 ? (
              <p className="text-xs text-slate-400">لا توجد بيانات بعد.</p>
            ) : (
              <div className="space-y-2 max-h-44 overflow-y-auto">
                {stats.byService.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() =>
                      setServiceFilter(
                        serviceFilter === item.name ? "" : item.name
                      )
                    }
                    className={`w-full p-2 rounded-xl border text-start transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      serviceFilter === item.name
                        ? "border-[#1366FF] bg-blue-50/70"
                        : "border-slate-100 bg-slate-50/60 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-xs font-semibold text-slate-700 truncate">
                      {item.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[11px] font-mono font-bold text-[#1366FF] shrink-0">
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Source Breakdown */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <h2 className="text-xs font-extrabold text-slate-700 mb-3">
              الطلبات حسب المصدر
            </h2>
            {stats.bySource.length === 0 ? (
              <p className="text-xs text-slate-400">لا توجد بيانات بعد.</p>
            ) : (
              <div className="space-y-2 max-h-44 overflow-y-auto">
                {stats.bySource.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() =>
                      setSourceFilter(
                        sourceFilter === item.name ? "" : item.name
                      )
                    }
                    className={`w-full p-2 rounded-xl border text-start transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      sourceFilter === item.name
                        ? "border-[#1366FF] bg-blue-50/70"
                        : "border-slate-100 bg-slate-50/60 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-xs font-mono font-semibold text-slate-700 truncate">
                      {item.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-[11px] font-mono font-bold text-emerald-700 shrink-0">
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Search & Filters Bar */}
        <section className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700">
              <Filter className="w-4 h-4 text-[#1366FF]" />
              <span>البحث والفلترة</span>
            </div>
            {(searchQuery ||
              statusFilter ||
              serviceFilter ||
              sourceFilter ||
              dateFrom ||
              dateTo) && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                مسح الفلاتر
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 right-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث بالاسم، الهاتف، البريد أو المرجع..."
                className="w-full pr-9 pl-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#1366FF]"
              />
            </div>

            {/* Status Select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1366FF]"
            >
              <option value="">كل الحالات</option>
              {LEAD_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {LEAD_STATUS_META[st].labelAr}
                </option>
              ))}
            </select>

            {/* Service Select */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1366FF]"
            >
              <option value="">كل الخدمات</option>
              {uniqueServiceNames.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>

            {/* Date From */}
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              aria-label="من تاريخ"
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1366FF]"
            />

            {/* Date To */}
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              aria-label="إلى تاريخ"
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1366FF]"
            />
          </div>
        </section>

        {/* Leads Table */}
        <section className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700">
              الطلبات ({leads.length})
            </span>
            {loadingList && (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                جاري التحديث...
              </span>
            )}
          </div>

          {leads.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">
              لا توجد طلبات مطابقة للبحث أو الفلاتر الحالية.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="bg-slate-50/90 border-b border-slate-200/80 text-[11px] font-bold text-slate-500">
                    <th className="py-3 px-4 text-start">المرجع / العميل</th>
                    <th className="py-3 px-4 text-start">التواصل</th>
                    <th className="py-3 px-4 text-start">الخدمة والميزانية</th>
                    <th className="py-3 px-4 text-start">المصدر والحملة</th>
                    <th className="py-3 px-4 text-start">الحالة</th>
                    <th className="py-3 px-4 text-start">آخر تواصل</th>
                    <th className="py-3 px-4 text-start">تاريخ الطلب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {leads.map((lead) => {
                    const stMeta =
                      LEAD_STATUS_META[lead.status] || LEAD_STATUS_META.new;
                    return (
                      <tr
                        key={lead.id}
                        onClick={() => void openLeadDetail(lead)}
                        className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#090D1A]">
                            {lead.name}
                          </div>
                          <div className="text-[11px] font-mono text-[#1366FF] mt-0.5">
                            {lead.ref_code}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-mono text-slate-700" dir="ltr">
                            {lead.phone}
                          </div>
                          {lead.email && (
                            <div
                              className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]"
                              dir="ltr"
                            >
                              {lead.email}
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800 max-w-[220px] truncate">
                            {lead.service_type}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {getBudgetLabel(lead.budget, "ar")}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold">
                            {lead.source}
                          </span>
                          {lead.utm_campaign && (
                            <div className="text-[11px] text-slate-500 font-mono mt-1 truncate max-w-[160px]">
                              {lead.utm_campaign}
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-bold ${stMeta.badgeClass}`}
                          >
                            {stMeta.labelAr}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-[11px] text-slate-500">
                          {formatDateTime(lead.last_contacted_at)}
                        </td>

                        <td className="py-3.5 px-4 text-[11px] text-slate-500">
                          {formatDateTime(lead.created_at)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Lead Detail Modal / Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-5 sm:p-7 relative">
            <button
              type="button"
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1366FF] border border-blue-200 text-xs font-mono font-bold">
                {selectedLead.ref_code}
              </span>
              <span
                className={`px-3 py-1 rounded-full border text-xs font-bold ${
                  LEAD_STATUS_META[selectedLead.status]?.badgeClass
                }`}
              >
                {LEAD_STATUS_META[selectedLead.status]?.labelAr}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#090D1A] mb-1">
              {selectedLead.name}
            </h2>
            <p className="text-xs text-slate-500 mb-5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>تم التسجيل: {formatDateTime(selectedLead.created_at)}</span>
            </p>

            {feedbackMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {/* Contact & Project Info */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5 text-xs">
                <h3 className="font-extrabold text-slate-800 mb-2">
                  بيانات العميل والمشروع
                </h3>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> الهاتف:
                  </span>
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="font-mono font-bold text-emerald-700 hover:underline"
                  >
                    {selectedLead.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> البريد:
                  </span>
                  <span className="font-mono text-slate-800" dir="ltr">
                    {selectedLead.email || "غير محدد"}
                  </span>
                </div>

                <div className="pt-1 border-t border-slate-200/70">
                  <span className="text-slate-500 block mb-0.5">الخدمة:</span>
                  <span className="font-bold text-[#090D1A]">
                    {selectedLead.service_type}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-0.5">
                    الميزانية المتوقعة:
                  </span>
                  <span className="font-bold text-slate-800">
                    {getBudgetLabel(selectedLead.budget, "ar")}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">وصف المشروع:</span>
                  <p className="p-2.5 rounded-xl bg-white border border-slate-200/70 text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedLead.project_description || "لم يتم إدخال تفاصيل إضافية."}
                  </p>
                </div>
              </div>

              {/* Attribution & Meta Tracking Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 text-xs">
                <h3 className="font-extrabold text-slate-800 mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#1366FF]" />
                  <span>مصدر الزيارة والحملة الإعلانية</span>
                </h3>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-[11px]">
                  <span className="text-slate-500">Source:</span>
                  <span className="text-slate-800 font-bold truncate">
                    {selectedLead.source}
                  </span>

                  <span className="text-slate-500">utm_source:</span>
                  <span className="text-slate-800 truncate">
                    {selectedLead.utm_source || "—"}
                  </span>

                  <span className="text-slate-500">utm_medium:</span>
                  <span className="text-slate-800 truncate">
                    {selectedLead.utm_medium || "—"}
                  </span>

                  <span className="text-slate-500">utm_campaign:</span>
                  <span className="text-slate-800 truncate">
                    {selectedLead.utm_campaign || "—"}
                  </span>

                  <span className="text-slate-500">utm_content:</span>
                  <span className="text-slate-800 truncate">
                    {selectedLead.utm_content || "—"}
                  </span>

                  <span className="text-slate-500">utm_term:</span>
                  <span className="text-slate-800 truncate">
                    {selectedLead.utm_term || "—"}
                  </span>

                  <span className="text-slate-500">landing_page:</span>
                  <span className="text-slate-800 truncate" dir="ltr">
                    {selectedLead.landing_page || "—"}
                  </span>

                  <span className="text-slate-500">referrer:</span>
                  <span className="text-slate-800 truncate" dir="ltr">
                    {selectedLead.referrer || "—"}
                  </span>

                  <span className="text-slate-500">fbp:</span>
                  <span className="text-slate-800 truncate" dir="ltr">
                    {selectedLead.fbp || "—"}
                  </span>

                  <span className="text-slate-500">fbc:</span>
                  <span className="text-slate-800 truncate" dir="ltr">
                    {selectedLead.fbc || "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* CRM Actions: Status, Last Contacted, Summary Notes */}
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/40 border border-blue-200/70 space-y-4 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    تغيير حالة الطلب
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={detailStatus}
                      onChange={(e) =>
                        setDetailStatus(e.target.value as LeadStatus)
                      }
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800"
                    >
                      {LEAD_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {LEAD_STATUS_META[st].labelAr} ({st})
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={
                        savingUpdate || detailStatus === selectedLead.status
                      }
                      onClick={() =>
                        void handlePatchLead({ status: detailStatus })
                      }
                      className="px-4 py-2 rounded-xl bg-[#1366FF] hover:bg-[#0052E0] text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
                    >
                      حفظ الحالة
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5">
                  <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1366FF]" />
                    <span>
                      آخر تواصل: {formatDateTime(selectedLead.last_contacted_at)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={savingUpdate}
                      onClick={() => void handlePatchLead({ logContact: true })}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer disabled:opacity-60"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>تسجيل تواصل الآن</span>
                    </button>

                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-bold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>فتح واتساب</span>
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ملخص الملاحظات الداخلية
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <textarea
                    rows={2}
                    value={detailInternalNotes}
                    onChange={(e) => setDetailInternalNotes(e.target.value)}
                    placeholder="اكتب ملخص حالة العميل أو المتطلبات المتفق عليها..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs resize-none"
                  />
                  <button
                    type="button"
                    disabled={savingUpdate}
                    onClick={() =>
                      void handlePatchLead({
                        internalNotes: detailInternalNotes.trim() || null,
                      })
                    }
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold self-end cursor-pointer disabled:opacity-50"
                  >
                    حفظ الملخص
                  </button>
                </div>
              </div>
            </div>

            {/* Notes & Activity Timeline */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#1366FF]" />
                <span>سجل المتابعة والملاحظات</span>
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="أضف ملاحظة متابعة جديدة في السجل الزمني..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#1366FF]"
                />
                <button
                  type="button"
                  disabled={savingUpdate || !newNoteText.trim()}
                  onClick={() =>
                    void handlePatchLead({ newNote: newNoteText.trim() })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1366FF] hover:bg-[#0052E0] text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إضافة</span>
                </button>
              </div>

              {loadingDetails ? (
                <div className="py-4 text-center text-xs text-slate-400">
                  جاري تحميل السجل...
                </div>
              ) : leadNotes.length === 0 ? (
                <div className="py-4 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                  لا توجد ملاحظات مسجلة لهذا الطلب بعد.
                </div>
              ) : (
                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {leadNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-mono">
                          {note.created_by_email || "System"}
                        </span>
                        <span>{formatDateTime(note.created_at)}</span>
                      </div>
                      <p className="text-slate-800 font-medium">{note.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
