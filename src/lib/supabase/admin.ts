import { createClient } from "@supabase/supabase-js";

/**
 * Returns whether the server-only Supabase Secret / Service Role key is configured.
 */
export function hasSupabaseAdminConfig(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)
  );
}

/**
 * Creates a privileged Supabase client for server-only operations (Route Handlers & Server Actions).
 * Never import or call this module in Client Components.
 */
export function createAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error("createAdminClient() must only be called on the server.");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Missing server Supabase credentials (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY)."
    );
  }

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
