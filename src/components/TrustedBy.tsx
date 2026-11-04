"use client";

import React from "react";
import { Landmark, Truck, HeartPulse, Cloud, Coins } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function TrustedBy() {
  const { lang } = useLanguage();
  const t = translations[lang].trustedBy;

  const clients = [
    { name: "FinNova.io", icon: Landmark, tag: "Fintech" },
    { name: "FastTrack Logistics", icon: Truck, tag: "Supply Chain" },
    { name: "SalamatTech", icon: HeartPulse, tag: "HealthTech" },
    { name: "CloudScale", icon: Cloud, tag: "Cloud Infra" },
    { name: "AuraPay", icon: Coins, tag: "Digital Payments" },
  ];

  return (
    <section className="py-6 sm:py-8 border-y border-slate-200/60 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs md:text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-5 sm:mb-6">
          {t.caption}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 lg:gap-16">
          {clients.map((client) => {
            const Icon = client.icon;
            return (
              <div
                key={client.name}
                className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1366FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight font-sans">
                    {client.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

