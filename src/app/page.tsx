"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesBento from "@/components/ServicesBento";
import PortfolioSection from "@/components/PortfolioSection";
import TechStackSection from "@/components/TechStackSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ShowreelModal from "@/components/ShowreelModal";

export default function Home() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFCFF] flex flex-col relative selection:bg-[#1366FF] selection:text-white">
      {/* Floating Navbar */}
      <Navbar onOpenConsultation={scrollToContact} />

      {/* Hero Section */}
      <HeroSection onOpenShowreel={() => setShowreelOpen(true)} />

      {/* Services Bento Grid */}
      <ServicesBento />

      {/* Portfolio & Case Studies */}
      <PortfolioSection />

      {/* High-Performance Tech Stack */}
      <TechStackSection />

      {/* 4-Step Engineering Process */}
      <ProcessSection />

      {/* Frequently Asked Questions (SEO & High-Intent CRO) */}
      <FAQSection />

      {/* Editorial Testimonials */}
      <TestimonialsSection />

      {/* Contact & Consultation Booking Form */}
      <ContactSection />

      {/* Minimalist Footer with Rich Internal Links */}
      <Footer />

      {/* Showreel Interactive Modal */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />
    </main>
  );
}
