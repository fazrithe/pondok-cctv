"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  return (
    <div className="bg-white py-10 sm:py-14">
      <Container>
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">Belanja</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Keranjang Belanja
          </h1>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 py-24 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50">
              <ShoppingBag size={28} className="text-slate-300" />
            </span>
            <p className="mt-5 text-base font-bold text-slate-700">Keranjang Anda masih kosong</p>
            <p className="mt-1.5 max-w-xs text-sm text-slate-400">
              Yuk, mulai belanja produk CCTV terbaik untuk keamanan rumah dan bisnis Anda.
            </p>
            <div className="mt-6">
              <ButtonLink href="/produk">
                <ArrowLeft size={16} /> Mulai Belanja
              </ButtonLink>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-900/[0.03]">
              <AnimatePresence>
                {items.map((item) => (
                  <CartItemRow key={item.product.id} item={item} />
                ))}
              </AnimatePresence>
              <Link
                href="/produk"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
              >
                <ArrowLeft size={14} /> Lanjut Belanja
              </Link>
            </div>

            <CartSummary />
          </div>
        )}
      </Container>
    </div>
  );
}
