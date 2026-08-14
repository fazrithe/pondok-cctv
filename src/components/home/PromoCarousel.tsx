"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import site from "@/data/site.json";

export default function PromoCarousel() {
  const banners = site.promoBanners;
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % banners.length), [banners.length]);
  const prev = () => setIndex((i) => (i - 1 + banners.length) % banners.length);

  useEffect(() => {
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next]);

  const banner = banners[index];

  return (
    <section className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex min-h-[220px] flex-col items-start justify-center overflow-hidden px-8 py-12 sm:px-14"
              style={{
                background: `linear-gradient(120deg, ${banner.color} 0%, ${banner.color}cc 100%)`,
              }}
            >
              <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10" />
              <div className="pointer-events-none absolute -bottom-20 right-24 h-56 w-56 rounded-full bg-white/10" />
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Promo Spesial
              </span>
              <h3 className="mt-4 max-w-md text-2xl font-extrabold text-white sm:text-3xl text-balance">
                {banner.title}
              </h3>
              <p className="mt-2 max-w-md text-sm text-white/85 sm:text-base">{banner.subtitle}</p>
              <Link
                href={banner.href}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition-transform hover:-translate-y-0.5"
              >
                {banner.cta} <ArrowRight size={16} />
              </Link>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            aria-label="Sebelumnya"
            className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition-colors hover:bg-white/40"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Berikutnya"
            className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur transition-colors hover:bg-white/40"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {banners.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
