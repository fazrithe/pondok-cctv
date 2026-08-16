"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, CalendarDays, Camera, X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { formatDateID } from "@/lib/format";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioItem } from "@/types";

const items = portfolioData as PortfolioItem[];

export const PORTFOLIO_CATEGORIES = [
  { key: "semua", label: "Semua Kegiatan" },
  { key: "rumah", label: "Rumah & Perumahan" },
  { key: "bisnis", label: "Ruko & Retail" },
  { key: "kantor", label: "Kantor & Klinik" },
  { key: "pendidikan", label: "Sekolah & Pesantren" },
  { key: "industri", label: "Pabrik & Gudang" },
] as const;

const categoryLabel = (key: string) =>
  PORTFOLIO_CATEGORIES.find((c) => c.key === key)?.label ?? key;

export default function PortfolioGallery() {
  const [category, setCategory] = useState<string>("semua");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const filtered = useMemo(
    () => (category === "semua" ? items : items.filter((i) => i.category === category)),
    [category]
  );

  const active = activeId ? items.find((i) => i.id === activeId) ?? null : null;

  const openItem = (item: PortfolioItem) => {
    setActiveId(item.id);
    setPhotoIndex(0);
  };

  const closeItem = () => setActiveId(null);

  const stepPhoto = (dir: number) => {
    if (!active) return;
    const total = active.images.length;
    setPhotoIndex((prev) => (prev + dir + total) % total);
  };

  // Keyboard controls + scroll lock while the lightbox is open.
  useEffect(() => {
    if (!active) return;
    const total = active.images.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
      if (e.key === "ArrowRight") setPhotoIndex((prev) => (prev + 1) % total);
      if (e.key === "ArrowLeft") setPhotoIndex((prev) => (prev - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {PORTFOLIO_CATEGORIES.map((cat) => {
          const count =
            cat.key === "semua" ? items.length : items.filter((i) => i.category === cat.key).length;
          const selected = category === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                selected
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {cat.label}
              <span className={`ml-2 text-xs ${selected ? "text-white/60" : "text-slate-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                onClick={() => openItem(item)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-sm shadow-slate-900/[0.03] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/[0.08]"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-slate-50">
                  <Image
                    src={item.images[0]}
                    alt={`Kegiatan pemasangan CCTV di ${item.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-slate-700 backdrop-blur">
                    {categoryLabel(item.category)}
                  </span>
                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-900/85 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                    <Camera size={12} /> {item.cameras} kamera
                  </span>
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-500 backdrop-blur">
                    {item.images.length} foto
                  </span>
                </span>

                <span className="flex flex-1 flex-col p-5">
                  <span className="text-base font-bold text-slate-900 group-hover:text-brand-600">
                    {item.title}
                  </span>
                  <span className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <MapPin size={14} className="shrink-0 text-brand-500" />
                    {item.location}
                  </span>
                  <span className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
                    <CalendarDays size={14} className="shrink-0" />
                    {formatDateID(item.date)}
                  </span>
                  <span className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {item.description}
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-16 flex flex-col items-center text-center">
          <ImageOff size={44} className="text-slate-300" />
          <p className="mt-4 text-sm font-semibold text-slate-500">
            Belum ada dokumentasi kegiatan untuk kategori ini.
          </p>
        </div>
      )}

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm"
            onClick={closeItem}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              <div className="relative aspect-[4/3] bg-slate-50 sm:aspect-[16/10]">
                <Image
                  key={active.images[photoIndex]}
                  src={active.images[photoIndex]}
                  alt={`Foto kegiatan ${active.title} ${photoIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
                <button
                  onClick={closeItem}
                  aria-label="Tutup"
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-white"
                >
                  <X size={18} />
                </button>
                {active.images.length > 1 ? (
                  <>
                    <button
                      onClick={() => stepPhoto(-1)}
                      aria-label="Foto sebelumnya"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-white"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => stepPhoto(1)}
                      aria-label="Foto berikutnya"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">
                      {photoIndex + 1} / {active.images.length}
                    </span>
                  </>
                ) : null}
              </div>

              <div className="p-6 sm:p-8">
                <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-600">
                  {categoryLabel(active.category)}
                </span>
                <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                  {active.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} className="text-brand-500" /> {active.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={15} className="text-brand-500" /> {formatDateID(active.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Camera size={15} className="text-brand-500" /> {active.cameras} unit kamera
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{active.description}</p>

                {active.images.length > 1 ? (
                  <div className="mt-6 flex gap-3">
                    {active.images.map((img, i) => (
                      <button
                        key={img}
                        onClick={() => setPhotoIndex(i)}
                        aria-label={`Lihat foto ${i + 1}`}
                        className={`relative h-16 w-24 overflow-hidden rounded-xl border-2 bg-slate-50 transition-colors ${
                          photoIndex === i ? "border-brand-500" : "border-transparent hover:border-slate-200"
                        }`}
                      >
                        <Image src={img} alt="" fill sizes="96px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
