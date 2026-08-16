"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingCart, MessageCircle, Check } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { openWhatsApp, productOrderMessage } from "@/lib/whatsapp";
import type { Product } from "@/types";

export default function AddToCartPanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleOrderViaWhatsApp = () => {
    openWhatsApp(productOrderMessage(product, qty));
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-slate-600">Jumlah</span>
        <div className="flex items-center rounded-full border border-slate-200">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center text-slate-500 hover:text-brand-600"
            aria-label="Kurangi"
          >
            <Minus size={15} />
          </button>
          <span className="w-10 text-center text-sm font-bold text-slate-800">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="flex h-10 w-10 items-center justify-center text-slate-500 hover:text-brand-600"
            aria-label="Tambah"
          >
            <Plus size={15} />
          </button>
        </div>
        <span className="text-xs text-slate-400">Stok tersedia: {product.stock}</span>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAdd}
          className="relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-slate-900 py-3.5 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50"
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 text-emerald-600"
              >
                <Check size={16} /> Ditambahkan
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart size={16} /> Tambah ke Keranjang
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleOrderViaWhatsApp}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600"
        >
          <MessageCircle size={16} /> Pesan via WhatsApp
        </motion.button>
      </div>

      <p className="mt-3 text-center text-xs text-slate-400 sm:text-left">
        Pesanan diproses langsung oleh tim kami melalui WhatsApp.
      </p>
    </div>
  );
}
