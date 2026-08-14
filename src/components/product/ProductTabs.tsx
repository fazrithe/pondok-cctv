"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import RatingStars from "@/components/ui/RatingStars";
import testimonialsData from "@/data/testimonials.json";
import type { Product, Testimonial } from "@/types";

const TABS = ["Deskripsi", "Spesifikasi", "Ulasan"] as const;

export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Deskripsi");
  const reviews = (testimonialsData as Testimonial[]).slice(0, 3);

  return (
    <div className="mt-16">
      <div className="flex gap-2 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="relative px-5 py-3 text-sm font-semibold text-slate-500 transition-colors data-[active=true]:text-slate-900"
            data-active={tab === t}
          >
            {t}
            {tab === t && (
              <motion.span layoutId="product-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-600" />
            )}
          </button>
        ))}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="py-8"
      >
        {tab === "Deskripsi" && (
          <div className="max-w-3xl space-y-4">
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{product.description}</p>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "Spesifikasi" && (
          <div className="max-w-2xl overflow-hidden rounded-2xl border border-slate-100">
            {Object.entries(product.specs).map(([key, value], i) => (
              <div
                key={key}
                className={`flex items-center justify-between px-5 py-3.5 text-sm ${
                  i % 2 === 0 ? "bg-slate-50/70" : "bg-white"
                }`}
              >
                <span className="font-semibold text-slate-500">{key}</span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "Ulasan" && (
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-5">
              <div className="text-4xl font-extrabold text-slate-900">{product.rating}</div>
              <div>
                <RatingStars rating={product.rating} size={16} />
                <div className="mt-1 text-xs text-slate-400">Berdasarkan {product.reviewCount} ulasan</div>
              </div>
            </div>
            <div className="space-y-5">
              {reviews.map((r) => (
                <div key={r.id} className="border-b border-slate-100 pb-5 last:border-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: r.avatarColor }}
                    >
                      {r.initials}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{r.name}</div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} size={11} className="fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
