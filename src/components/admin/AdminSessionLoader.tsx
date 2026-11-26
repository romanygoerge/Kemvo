import React from "react";
import { requireAdminUser } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";
import type { LeadRecord, LeadStats, LeadStatus } from "@/lib/supabase/types";
import AdminDashboardClient from "./AdminDashboardClient";

function buildInitialStats(
  rows: Pick<LeadRecord, "status" | "service_type" | "source">[]
): LeadStats {
  const byStatus: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal_sent: 0,
    won: 0,
    lost: 0,
  };
  const serviceMap = new Map<string, number>();
  const sourceMap = new Map<string, number>();

  for (const row of rows) {
    if (row.status in byStatus) byStatus[row.status] += 1;
    const svc = row.service_type || "غير محدد";
    serviceMap.set(svc, (serviceMap.get(svc) || 0) + 1);
    const src = row.source || "website_form";
    sourceMap.set(src, (sourceMap.get(src) || 0) + 1);
  }

  return {
    total: rows.length,
    byStatus,
    byService: Array.from(serviceMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    bySource: Array.from(sourceMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
  };
}

export default async function AdminSessionLoader() {
  const admin = await requireAdminUser();
  const supabase = await createClient();

  const { data: leadsData } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  const initialLeads = (leadsData || []) as LeadRecord[];
  const initialStats = buildInitialStats(initialLeads);

  return (
    <AdminDashboardClient
      adminEmail={admin.email}
      initialLeads={initialLeads}
      initialStats={initialStats}
    />
  );
}
