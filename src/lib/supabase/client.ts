import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

/**
 * Creates a Supabase client for Client Components running in the browser.
 */
export function createClient() {
  const { url, key } = getSupabaseConfig();
  return createBrowserClient(url, key);
}
