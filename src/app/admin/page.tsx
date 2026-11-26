import React, { Suspense } from "react";
import type { Metadata } from "next";
import AdminSessionLoader from "@/components/admin/AdminSessionLoader";

export const metadata: Metadata = {
  title: "إدارة العملاء المحتملين | Kemvo CRM",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFCFF] flex items-center justify-center text-sm font-semibold text-slate-500">
          جاري تحميل لوحة إدارة العملاء...
        </div>
      }
    >
      <AdminSessionLoader />
    </Suspense>
  );
}
