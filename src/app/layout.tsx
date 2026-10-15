import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APEX HUB | Performance & Functional Center",
  description: "Mega centro de entrenamiento multizona: Musculación, CrossFit, Pilates, Shake Bar y control de aforo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0D0F12] text-zinc-100 flex flex-col pb-24 md:pb-0`}
      >
        {children}
        <BottomNav />
      </body>
    </html>
  );
}