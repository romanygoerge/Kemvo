import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AuthenticatedAdmin {
  userId: string;
  email: string;
  role: string;
}

/**
 * Verifies the current SSR session via supabase.auth.getUser() and checks active admin membership
 * against public.admin_users (enforced by RLS). Returns null if unauthenticated or unauthorized.
 */
export async function getAuthenticatedAdmin(): Promise<AuthenticatedAdmin | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data: adminRow, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id, email, role, is_active")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (adminError || !adminRow) {
    return null;
  }

  return {
    userId: adminRow.user_id,
    email: adminRow.email || user.email || "",
    role: adminRow.role || "admin",
  };
}

/**
 * Guards server routes/pages by redirecting unauthorized callers to /admin/login.
 */
export async function requireAdminUser(): Promise<AuthenticatedAdmin> {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    redirect("/admin/login");
  }
  return admin;
}
