import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import the component you just made
import Footer from "@/components/Footer"; // Import the component you just made

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deutronix - Precision Wellness",
  description: "Advanced wellness solutions built on Deuterium-Depleted Water science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />  {/* Sticks to the top of every page */}
        <main className="min-h-screen pt-[60px]">
          {children} {/* This is where your Hero.tsx and other page content goes */}
        </main>
        <Footer />  {/* Sticks to the bottom of every page */}
      </body>
    </html>
  );
}