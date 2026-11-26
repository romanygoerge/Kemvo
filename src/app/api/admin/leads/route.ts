import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";
import {
  LEAD_STATUSES,
  type LeadRecord,
  type LeadStats,
  type LeadStatus,
} from "@/lib/supabase/types";

function computeStats(rows: Pick<LeadRecord, "status" | "service_type" | "source">[]): LeadStats {
  const byStatus: Record<LeadStatus, number> = {
    new: 0,
    contacted: 0,
    qualified: 0,
    proposal_sent: 0,
    won: 0,
    lost: 0,
  };

  const serviceCounts = new Map<string, number>();
  const sourceCounts = new Map<string, number>();

  for (const row of rows) {
    if (row.status in byStatus) {
      byStatus[row.status] += 1;
    }
    const svc = row.service_type || "غير محدد";
    serviceCounts.set(svc, (serviceCounts.get(svc) || 0) + 1);

    const src = row.source || "website_form";
    sourceCounts.set(src, (sourceCounts.get(src) || 0) + 1);
  }

  return {
    total: rows.length,
    byStatus,
    byService: Array.from(serviceCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    bySource: Array.from(sourceCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
  };
}

export async function GET(req: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q")?.trim() || "";
  const status = searchParams.get("status")?.trim() || "";
  const service = searchParams.get("service")?.trim() || "";
  const source = searchParams.get("source")?.trim() || "";
  const from = searchParams.get("from")?.trim() || "";
  const to = searchParams.get("to")?.trim() || "";

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (status && (LEAD_STATUSES as readonly string[]).includes(status)) {
    query = query.eq("status", status);
  }

  if (service) {
    query = query.eq("service_type", service);
  }

  if (source) {
    query = query.eq("source", source);
  }

  if (from) {
    query = query.gte("created_at", `${from}T00:00:00.000Z`);
  }

  if (to) {
    query = query.lte("created_at", `${to}T23:59:59.999Z`);
  }

  if (q) {
    const safeQ = q.replace(/[%_,()*]/g, "");
    if (safeQ) {
      query = query.or(
        `name.ilike.%${safeQ}%,phone.ilike.%${safeQ}%,email.ilike.%${safeQ}%,ref_code.ilike.%${safeQ}%`
      );
    }
  }

  const [leadsRes, statsRes] = await Promise.all([
    query,
    supabase.from("leads").select("status, service_type, source"),
  ]);

  if (leadsRes.error) {
    console.error("[GET /api/admin/leads] Query failed:", leadsRes.error);
    return NextResponse.json(
      { error: "Failed to load leads" },
      { status: 500 }
    );
  }

  const stats = computeStats(
    (statsRes.data || []) as Pick<
      LeadRecord,
      "status" | "service_type" | "source"
    >[]
  );

  return NextResponse.json({
    leads: leadsRes.data || [],
    stats,
  });
}
