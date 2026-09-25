import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseAuth = Boolean(supabaseUrl && supabaseAnonKey);
export const supabase: SupabaseClient | null = hasSupabaseAuth
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;

export const getSession = async (): Promise<Session | null> => {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
};

export const authRedirect = () => `${window.location.origin}/auth/callback`;

export async function signInWithProvider(provider: "google" | "github") {
  if (!supabase) return { error: new Error("Supabase auth is not configured.") };
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: authRedirect() },
  });
  return { error };
}
