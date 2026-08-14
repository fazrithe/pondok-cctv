"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import { useCartStore } from "@/store/cart";
import type { CartItem } from "@/types";

export default function CartItemRow({ item }: { item: CartItem }) {
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 border-b border-slate-100 py-5 last:border-0"
    >
      <Link href={`/produk/${item.product.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50">
        <Image src={item.product.images[0]} alt={item.product.name} fill sizes="80px" className="object-cover" />
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/produk/${item.product.slug}`}>
          <h3 className="line-clamp-1 text-sm font-bold text-slate-800 hover:text-brand-600">
            {item.product.name}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs text-slate-400">{item.product.brand}</p>
        <p className="mt-1.5 text-sm font-bold text-slate-900">{formatRupiah(item.product.price)}</p>
      </div>

      <div className="flex items-center rounded-full border border-slate-200">
        <button
          onClick={() => updateQty(item.product.id, item.qty - 1)}
          className="flex h-8 w-8 items-center justify-center text-slate-500 hover:text-brand-600"
          aria-label="Kurangi"
        >
          <Minus size={13} />
        </button>
        <span className="w-8 text-center text-sm font-bold text-slate-800">{item.qty}</span>
        <button
          onClick={() => updateQty(item.product.id, Math.min(item.product.stock, item.qty + 1))}
          className="flex h-8 w-8 items-center justify-center text-slate-500 hover:text-brand-600"
          aria-label="Tambah"
        >
          <Plus size={13} />
        </button>
      </div>

      <div className="hidden w-28 shrink-0 text-right text-sm font-extrabold text-slate-900 sm:block">
        {formatRupiah(item.product.price * item.qty)}
      </div>

      <button
        onClick={() => removeItem(item.product.id)}
        className="shrink-0 text-slate-300 hover:text-rose-500"
        aria-label="Hapus"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}
