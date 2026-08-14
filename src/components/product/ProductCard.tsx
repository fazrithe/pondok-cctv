"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import Badge from "@/components/ui/Badge";
import RatingStars from "@/components/ui/RatingStars";
import { formatRupiah, discountPercent } from "@/lib/format";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm shadow-slate-900/[0.03] transition-shadow hover:shadow-xl hover:shadow-slate-900/[0.08]"
    >
      <Link href={`/produk/${product.slug}`} className="relative block aspect-square overflow-hidden bg-slate-50">
        <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.4 }} className="h-full w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge ? <Badge>{product.badge}</Badge> : null}
          {discount > 0 ? (
            <span className="inline-flex w-fit items-center rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
              -{discount}%
            </span>
          ) : null}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-slate-900/60 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-800">
            <Eye size={13} /> Lihat Detail
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-500">{product.brand}</span>
        <Link href={`/produk/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-bold text-slate-800 hover:text-brand-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1.5">
          <RatingStars rating={product.rating} size={12} />
          <span className="text-xs text-slate-400">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-extrabold text-slate-900">{formatRupiah(product.price)}</span>
          {product.originalPrice ? (
            <span className="text-xs text-slate-400 line-through">{formatRupiah(product.originalPrice)}</span>
          ) : null}
        </div>
        <div className="mt-0.5 text-xs text-slate-400">Terjual {product.sold}+</div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            addItem(product, 1);
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-600"
        >
          <ShoppingCart size={14} />
          Tambah ke Keranjang
        </motion.button>
      </div>
    </motion.div>
  );
}
