import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Peta UMKM Kuliner — RW 09 Sendangmulyo",
  description:
    "Pemetaan digital & direktori UMKM kuliner RW 09 Kelurahan Sendangmulyo — mendukung kawasan kuliner halal, aman, dan sehat. KKNT IDBU 58.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <meta name="apple-mobile-web-app-title" content="Peta UMKM" />
      <body className={`font-avenir bg-ink text-paper antialiased`}>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-line px-6 py-10 text-sm text-paper/50">
          <div className="mx-auto max-w-6xl flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Multidisiplin 2, Faiza Tanjia · Teknik Komputer · KKNT IDBU 58, RW 09 Kelurahan Sendangmulyo
            </p>
            <p className="font-avenir text-xs  tracking-wider text-paper/40">
              Zona Kuliner Halal · Aman · Sehat
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
