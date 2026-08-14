"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

const TABS = [
  { key: "best-seller", label: "Best Seller" },
  { key: "diskon", label: "Diskon" },
  { key: "paket", label: "Paket CCTV" },
  { key: "terbaru", label: "Terbaru" },
] as const;

export default function FeaturedProducts() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("best-seller");
  const products = productsData as unknown as Product[];

  const filtered = useMemo(() => {
    switch (active) {
      case "best-seller":
        return products.filter((p) => p.badge === "Best Seller").slice(0, 8);
      case "diskon":
        return [...products]
          .filter((p) => p.originalPrice)
          .sort(
            (a, b) =>
              ((b.originalPrice! - b.price) / b.originalPrice!) -
              ((a.originalPrice! - a.price) / a.originalPrice!)
          )
          .slice(0, 8);
      case "paket":
        return products.filter((p) => p.category === "paket-cctv");
      case "terbaru":
        return [...products].reverse().slice(0, 8);
      default:
        return products.slice(0, 8);
    }
  }, [active, products]);

  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Produk Pilihan"
            title="Produk Terlaris & Terbaik"
            description="Dipilih berdasarkan rating, ulasan, dan tingkat penjualan tertinggi dari pelanggan kami."
            className="sm:mx-0"
          />
          <Link
            href="/produk"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 sm:flex"
          >
            Lihat Semua Produk <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                active === tab.key ? "text-white" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {active === tab.key && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-slate-900"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/produk"
            className="flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            Lihat Semua Produk <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
