"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import { discountPercent } from "@/lib/format";
import type { Product } from "@/types";

export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-50">
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
          {product.badge ? <Badge>{product.badge}</Badge> : null}
          {discount > 0 ? (
            <span className="inline-flex w-fit items-center rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
              -{discount}%
            </span>
          ) : null}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-full w-full"
          >
            <Image
              src={product.images[active]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {product.images.length > 1 ? (
        <div className="mt-4 flex gap-3">
          {product.images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 bg-slate-50 transition-colors ${
                active === i ? "border-brand-500" : "border-transparent hover:border-slate-200"
              }`}
            >
              <Image src={img} alt={`${product.name} ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
