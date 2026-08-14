import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import CartHydration from "@/components/layout/CartHydration";

export const metadata: Metadata = {
  title: {
    default: "Pondok CCTV - Rumah Aman, Bisnis Tenang",
    template: "%s | Pondok CCTV",
  },
  description:
    "Pondok CCTV adalah toko online CCTV & perangkat keamanan terpercaya dengan produk berkualitas, harga bersaing, dan layanan instalasi profesional di seluruh Indonesia.",
  keywords: [
    "CCTV",
    "jual CCTV",
    "kamera pengawas",
    "DVR",
    "NVR",
    "paket CCTV",
    "toko CCTV online",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <CartHydration />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
