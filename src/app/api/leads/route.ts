import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, hasSupabaseAdminConfig } from "@/lib/supabase/admin";
import { resolveSlugByLabel } from "@/lib/leads/services";
import {
  createLeadSchema,
  formatInternationalPhone,
} from "@/lib/leads/validation";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const DUPLICATE_COOLDOWN_MS = 2 * 60 * 1000; // 2 minutes

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

function hashIp(ip: string): string {
  const salt =
    process.env.RATE_LIMIT_SALT ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "kemvo-lead-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function POST(req: NextRequest) {
  if (!hasSupabaseAdminConfig()) {
    return NextResponse.json(
      {
        success: false,
        code: "SERVER_NOT_CONFIGURED",
        error:
          "خدمة حفظ الطلبات قيد التهيئة على الخادم (مفتاح السيرفر لقاعدة البيانات غير مضاف).",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        code: "INVALID_JSON",
        error: "صيغة الطلب غير صالحة.",
      },
      { status: 400 }
    );
  }

  const parsed = createLeadSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        success: false,
        code: "VALIDATION_ERROR",
        error: firstIssue?.message || "يرجى التأكد من صحة جميع البيانات المطلوبة.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const input = parsed.data;

  // Honeypot anti-spam trap
  if (input.website && input.website.trim().length > 0) {
    return NextResponse.json(
      {
        success: false,
        code: "SPAM_REJECTED",
        error: "تم رفض الطلب.",
      },
      { status: 400 }
    );
  }

  const phoneCheck = formatInternationalPhone(input.countryCode, input.phone);
  if (!phoneCheck.valid) {
    return NextResponse.json(
      {
        success: false,
        code: "INVALID_PHONE",
        error: "رقم الهاتف غير صحيح. يرجى إدخال رقم واتساب صالح.",
      },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  try {
    // 1. Idempotency check (prevents duplicate rows on rapid double clicks or retries)
    if (input.idempotencyKey) {
      const { data: existingByKey, error: keyErr } = await supabase
        .from("leads")
        .select("id, ref_code, created_at")
        .eq("idempotency_key", input.idempotencyKey)
        .maybeSingle();

      if (keyErr) {
        throw keyErr;
      }

      if (existingByKey) {
        return NextResponse.json(
          {
            success: true,
            duplicate: true,
            lead: existingByKey,
          },
          { status: 200 }
        );
      }
    }

    // 2. Recent identical phone + service cooldown (prevents duplicate leads across refreshes)
    const cooldownSince = new Date(Date.now() - DUPLICATE_COOLDOWN_MS).toISOString();
    const { data: recentDuplicate, error: dupErr } = await supabase
      .from("leads")
      .select("id, ref_code, created_at")
      .eq("phone", phoneCheck.formatted)
      .eq("service_type", input.serviceType)
      .gte("created_at", cooldownSince)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (dupErr) {
      throw dupErr;
    }

    if (recentDuplicate) {
      return NextResponse.json(
        {
          success: true,
          duplicate: true,
          lead: recentDuplicate,
        },
        { status: 200 }
      );
    }

    // 3. Distributed IP rate-limit check
    const ip = getClientIp(req);
    const ipHash = ip !== "unknown" ? hashIp(ip) : null;
    if (ipHash) {
      const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
      const { count, error: rateErr } = await supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("created_at", windowStart);

      if (rateErr) {
        throw rateErr;
      }

      if ((count ?? 0) >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            success: false,
            code: "RATE_LIMITED",
            error:
              "تم إرسال عدة طلبات متتالية من نفس الاتصال. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.",
          },
          { status: 429 }
        );
      }
    }

    // 4. Insert new lead with default status 'new'
    const resolvedSlug =
      input.serviceSlug || resolveSlugByLabel(input.serviceType) || null;
    const userAgent = req.headers.get("user-agent")?.slice(0, 500) || null;

    const { data: inserted, error: insertErr } = await supabase
      .from("leads")
      .insert({
        name: input.name,
        email: input.email,
        country_code: input.countryCode,
        phone: phoneCheck.formatted,
        service_type: input.serviceType,
        service_slug: resolvedSlug,
        project_description: input.projectDescription,
        budget: input.budget,
        status: "new",
        source: input.source || "website_form",
        landing_page: input.landingPage,
        referrer: input.referrer,
        utm_source: input.utmSource,
        utm_medium: input.utmMedium,
        utm_campaign: input.utmCampaign,
        utm_content: input.utmContent,
        utm_term: input.utmTerm,
        fbclid: input.fbclid,
        fbp: input.fbp,
        fbc: input.fbc,
        locale: input.locale,
        idempotency_key: input.idempotencyKey,
        ip_hash: ipHash,
        user_agent: userAgent,
      })
      .select("id, ref_code, created_at")
      .single();

    if (insertErr) {
      // Handle race condition on unique idempotency_key cleanly
      if (insertErr.code === "23505" && input.idempotencyKey) {
        const { data: existingRace } = await supabase
          .from("leads")
          .select("id, ref_code, created_at")
          .eq("idempotency_key", input.idempotencyKey)
          .maybeSingle();

        if (existingRace) {
          return NextResponse.json(
            {
              success: true,
              duplicate: true,
              lead: existingRace,
            },
            { status: 200 }
          );
        }
      }
      throw insertErr;
    }

    return NextResponse.json(
      {
        success: true,
        duplicate: false,
        lead: inserted,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/leads] Failed to persist lead:", err);
    return NextResponse.json(
      {
        success: false,
        code: "PERSISTENCE_ERROR",
        error:
          "تعذر حفظ طلبك في قاعدة البيانات حالياً. يرجى المحاولة مرة أخرى خلال لحظات.",
      },
      { status: 500 }
    );
  }
}
