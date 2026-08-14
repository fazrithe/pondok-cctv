import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/product/ProductCard";
import { Tag } from "lucide-react";
import productsData from "@/data/products.json";
import { discountPercent } from "@/lib/format";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Promo",
  description: "Dapatkan penawaran spesial dan diskon terbaik untuk produk CCTV pilihan di Pondok CCTV.",
};

export default function PromoPage() {
  const products = productsData as unknown as Product[];
  const discounted = [...products]
    .filter((p) => p.originalPrice)
    .sort((a, b) => discountPercent(b.price, b.originalPrice) - discountPercent(a.price, a.originalPrice));

  return (
    <div className="bg-white py-10 sm:py-14">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 to-orange-500 px-8 py-14 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 -right-6 h-64 w-64 rounded-full bg-white/10" />
          <span className="relative inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
            <Tag size={13} /> Promo Terbatas
          </span>
          <h1 className="relative mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Diskon Spesial Produk CCTV Pilihan
          </h1>
          <p className="relative mx-auto mt-3 max-w-lg text-sm text-white/90 sm:text-base">
            Hemat lebih banyak untuk kamera, DVR/NVR, dan paket lengkap CCTV. Stok terbatas, buruan sebelum kehabisan!
          </p>
        </div>

        <p className="mt-8 text-sm text-slate-400">
          Menampilkan <span className="font-semibold text-slate-700">{discounted.length}</span> produk diskon
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {discounted.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
