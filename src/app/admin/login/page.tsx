"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowRight, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInErr } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInErr || !data.user) {
        setError("بيانات الدخول غير صحيحة. تأكد من البريد الإلكتروني وكلمة المرور.");
        return;
      }

      // Verify the signed-in user is registered in public.admin_users
      const { data: adminRow, error: adminErr } = await supabase
        .from("admin_users")
        .select("user_id, is_active")
        .eq("user_id", data.user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (adminErr || !adminRow) {
        await supabase.auth.signOut();
        setError("هذا الحساب غير مصرح له بالدخول إلى لوحة إدارة العملاء.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("تعذر الاتصال بخادم المصادقة. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060A18] text-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute -top-40 right-1/4 w-[420px] h-[420px] bg-[#1366FF]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[360px] h-[360px] bg-[#00C6FF]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للموقع الرئيسي</span>
          </Link>
          <span className="text-xs font-mono text-blue-400 font-bold">
            KEMVO CRM
          </span>
        </div>

        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-[#1366FF]/20 border border-[#1366FF]/40 text-[#38BDF8] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white">
                تسجيل دخول الإدارة
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                إدارة العملاء المحتملين ومصادر الحملات
              </p>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                البريد الإلكتروني الإداري
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 right-3.5" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kemvo.studio"
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#1366FF] text-left font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 right-3.5" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#1366FF] text-left font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1366FF] to-[#252BFA] hover:from-[#0052E0] hover:to-[#1A20EA] text-white font-bold text-sm shadow-glow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري التحقق...</span>
                </>
              ) : (
                <span>دخول إلى لوحة العملاء</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
