import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";

/**
 * Creates a request-scoped Supabase client for Server Components, Route Handlers, and Server Actions.
 */
export async function createClient() {
  const { url, key } = getSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component where setting cookies is not allowed.
        }
      },
    },
  });
}
