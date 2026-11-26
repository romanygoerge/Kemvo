import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";
import { updateLeadSchema } from "@/lib/leads/validation";
import { LEAD_STATUS_META } from "@/lib/supabase/types";

const uuidSchema = z.string().uuid();

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!uuidSchema.safeParse(id).success) {
    return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 });
  }
  const supabase = await createClient();

  const [leadRes, notesRes] = await Promise.all([
    supabase.from("leads").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("lead_notes")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: false }),
  ]);

  if (leadRes.error) {
    return NextResponse.json({ error: "Failed to load lead" }, { status: 500 });
  }

  if (!leadRes.data) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({
    lead: leadRes.data,
    notes: notesRes.data || [],
  });
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!uuidSchema.safeParse(id).success) {
    return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = updateLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid update payload",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const input = parsed.data;
  const supabase = await createClient();

  const { data: existing, error: fetchErr } = await supabase
    .from("leads")
    .select("id, status, internal_notes, last_contacted_at")
    .eq("id", id)
    .maybeSingle();

  if (fetchErr) {
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 });
  }
  if (!existing) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const updates: Record<string, unknown> = {};
  const notesToInsert: {
    lead_id: string;
    note: string;
    note_type: "note" | "status_change" | "contact_log";
    created_by: string;
    created_by_email: string;
  }[] = [];

  if (input.status && input.status !== existing.status) {
    updates.status = input.status;
    const oldLabel =
      LEAD_STATUS_META[existing.status as keyof typeof LEAD_STATUS_META]?.labelAr ||
      existing.status;
    const newLabel =
      LEAD_STATUS_META[input.status]?.labelAr || input.status;
    notesToInsert.push({
      lead_id: id,
      note: `تغيير الحالة من «${oldLabel}» إلى «${newLabel}»`,
      note_type: "status_change",
      created_by: admin.userId,
      created_by_email: admin.email,
    });
  }

  if (input.internalNotes !== undefined) {
    updates.internal_notes = input.internalNotes;
  }

  if (input.logContact) {
    const nowIso = new Date().toISOString();
    updates.last_contacted_at = nowIso;
    notesToInsert.push({
      lead_id: id,
      note: "تم تسجيل تواصل جديد مع العميل",
      note_type: "contact_log",
      created_by: admin.userId,
      created_by_email: admin.email,
    });
  } else if (input.lastContactedAt !== undefined) {
    updates.last_contacted_at = input.lastContactedAt;
  }

  if (input.newNote) {
    notesToInsert.push({
      lead_id: id,
      note: input.newNote,
      note_type: "note",
      created_by: admin.userId,
      created_by_email: admin.email,
    });
  }

  let updatedLead = null;
  if (Object.keys(updates).length > 0) {
    const { data, error: updateErr } = await supabase
      .from("leads")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (updateErr) {
      console.error("[PATCH /api/admin/leads/[id]] Update failed:", updateErr);
      return NextResponse.json(
        { error: "Failed to update lead" },
        { status: 500 }
      );
    }
    updatedLead = data;
  } else {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .single();
    updatedLead = data;
  }

  if (notesToInsert.length > 0) {
    const { error: noteErr } = await supabase
      .from("lead_notes")
      .insert(notesToInsert);

    if (noteErr) {
      console.error("[PATCH /api/admin/leads/[id]] Note insert failed:", noteErr);
      return NextResponse.json(
        { error: "Lead updated, but failed to log note" },
        { status: 500 }
      );
    }
  }

  const { data: notes } = await supabase
    .from("lead_notes")
    .select("*")
    .eq("lead_id", id)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    lead: updatedLead,
    notes: notes || [],
  });
}
