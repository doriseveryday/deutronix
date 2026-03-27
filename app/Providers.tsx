"use client";

import { LanguageProvider } from "./LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="min-h-screen pt-[60px]">
        {children}
      </main>
      <Footer />
    </LanguageProvider>
  );
}
