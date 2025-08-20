"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PortfolioLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#0d0d12] text-white overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      {children}

      {/* Footer */}
      <Footer />
    </div>
  );
}
