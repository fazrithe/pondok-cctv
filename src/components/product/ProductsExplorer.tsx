"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, PackageSearch } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import type { Product, Category } from "@/types";

const PRICE_BANDS = [
  { key: "all", label: "Semua Harga", min: 0, max: Infinity },
  { key: "under-500", label: "Di bawah Rp500rb", min: 0, max: 500_000 },
  { key: "500-1jt", label: "Rp500rb - Rp1jt", min: 500_000, max: 1_000_000 },
  { key: "1-3jt", label: "Rp1jt - Rp3jt", min: 1_000_000, max: 3_000_000 },
  { key: "above-3jt", label: "Di atas Rp3jt", min: 3_000_000, max: Infinity },
] as const;

const SORT_OPTIONS = [
  { key: "populer", label: "Paling Populer" },
  { key: "terbaru", label: "Terbaru" },
  { key: "harga-asc", label: "Harga Terendah" },
  { key: "harga-desc", label: "Harga Tertinggi" },
  { key: "rating", label: "Rating Tertinggi" },
] as const;

const products = productsData as unknown as Product[];
const categories = categoriesData as Category[];

export default function ProductsExplorer() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";

  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [priceBand, setPriceBand] = useState<(typeof PRICE_BANDS)[number]["key"]>("all");
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]["key"]>("populer");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceBand("all");
    setQuery("");
    setSort("populer");
  };

  const filtered = useMemo(() => {
    const band = PRICE_BANDS.find((b) => b.key === priceBand)!;
    let result = products.filter((p) => {
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesPrice = p.price >= band.min && p.price < band.max;
      return matchesQuery && matchesCategory && matchesPrice;
    });

    switch (sort) {
      case "harga-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "harga-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "terbaru":
        result = [...result].reverse();
        break;
      default:
        result = [...result].sort((a, b) => b.sold - a.sold);
    }
    return result;
  }, [query, selectedCategories, priceBand, sort]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
      {/* Sidebar filters - desktop */}
      <aside className="hidden lg:block">
        <FiltersPanel
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          priceBand={priceBand}
          setPriceBand={setPriceBand}
          resetFilters={resetFilters}
        />
      </aside>

      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk atau merek..."
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 lg:hidden"
            >
              <SlidersHorizontal size={15} /> Filter
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 outline-none focus:border-brand-400"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-400">
          Menampilkan <span className="font-semibold text-slate-700">{filtered.length}</span> dari{" "}
          {products.length} produk
        </p>

        {filtered.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <PackageSearch size={48} className="text-slate-300" />
            <p className="mt-4 text-sm font-semibold text-slate-500">
              Produk tidak ditemukan untuk filter ini.
            </p>
            <button
              onClick={resetFilters}
              className="mt-3 text-sm font-bold text-brand-600 hover:text-brand-700"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-xs overflow-y-auto bg-white p-5 shadow-2xl lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800">Filter Produk</h3>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Tutup">
                  <X size={20} />
                </button>
              </div>
              <FiltersPanel
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                priceBand={priceBand}
                setPriceBand={setPriceBand}
                resetFilters={resetFilters}
              />
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-6 w-full rounded-full bg-slate-900 py-3 text-sm font-bold text-white"
              >
                Terapkan Filter
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FiltersPanel({
  selectedCategories,
  toggleCategory,
  priceBand,
  setPriceBand,
  resetFilters,
}: {
  selectedCategories: string[];
  toggleCategory: (slug: string) => void;
  priceBand: string;
  setPriceBand: (key: (typeof PRICE_BANDS)[number]["key"]) => void;
  resetFilters: () => void;
}) {
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Filter</h3>
        <button onClick={resetFilters} className="text-xs font-semibold text-brand-600 hover:text-brand-700">
          Reset
        </button>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Kategori</h4>
        <div className="mt-3 space-y-2.5">
          {categories.map((cat) => (
            <label key={cat.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Rentang Harga</h4>
        <div className="mt-3 space-y-2.5">
          {PRICE_BANDS.map((band) => (
            <label key={band.key} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
              <input
                type="radio"
                name="price-band"
                checked={priceBand === band.key}
                onChange={() => setPriceBand(band.key)}
                className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-400"
              />
              {band.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
