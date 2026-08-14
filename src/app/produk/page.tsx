import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProductsExplorer from "@/components/product/ProductsExplorer";

export const metadata: Metadata = {
  title: "Semua Produk",
  description: "Jelajahi koleksi lengkap kamera CCTV, DVR, NVR, dan paket keamanan dari Pondok CCTV.",
};

export default function ProdukPage() {
  return (
    <div className="bg-white py-10 sm:py-14">
      <Container>
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">Katalog Produk</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Semua Produk CCTV
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
            Temukan kamera, perekam, dan paket CCTV terbaik dengan kualitas terjamin dan harga
            bersaing untuk kebutuhan rumah maupun bisnis Anda.
          </p>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-sm text-slate-400">Memuat produk...</div>}>
          <ProductsExplorer />
        </Suspense>
      </Container>
    </div>
  );
}
