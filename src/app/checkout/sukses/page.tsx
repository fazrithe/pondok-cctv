"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle, Home, Package } from "lucide-react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { formatRupiah } from "@/lib/format";
import { useCartStore } from "@/store/cart";
import site from "@/data/site.json";

export default function CheckoutSuccessPage() {
  const lastOrder = useCartStore((s) => s.lastOrder);
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    const id = setTimeout(() => setReady(true), 250);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (ready && !lastOrder) {
      router.replace("/");
    }
  }, [ready, lastOrder, router]);

  if (!lastOrder) {
    return <div className="min-h-[60vh]" />;
  }

  const waMessage = `Halo Pondok CCTV, saya sudah melakukan pemesanan dengan nomor ${lastOrder.orderNumber} atas nama ${lastOrder.customerName}. Mohon konfirmasi pesanan saya.`;

  return (
    <div className="bg-white py-12 sm:py-16">
      <Container className="max-w-2xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50"
          >
            <svg viewBox="0 0 52 52" className="h-14 w-14">
              <motion.circle
                cx="26"
                cy="26"
                r="24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.path
                d="M15 27 L23 35 L38 18"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="mt-6 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Pesanan Berhasil Dibuat!
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Terima kasih, {lastOrder.customerName}. Kami akan segera memproses pesanan Anda.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-10 rounded-2xl border border-slate-100 p-6 shadow-sm shadow-slate-900/[0.03]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-slate-200 pb-4">
            <div>
              <p className="text-xs text-slate-400">Nomor Pesanan</p>
              <p className="text-sm font-bold text-slate-800">{lastOrder.orderNumber}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Metode Pembayaran</p>
              <p className="text-sm font-bold text-slate-800">{lastOrder.paymentMethod}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Status</p>
              <p className="text-sm font-bold text-amber-600">Menunggu Konfirmasi</p>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {lastOrder.items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                  <Image src={item.product.images[0]} alt={item.product.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold text-slate-700">{item.product.name}</p>
                  <p className="text-xs text-slate-400">
                    {item.qty} x {formatRupiah(item.product.price)}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-bold text-slate-800">
                  {formatRupiah(item.product.price * item.qty)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between border-t border-slate-100 pt-4">
            <span className="text-sm font-bold text-slate-800">Total Pembayaran</span>
            <span className="text-lg font-extrabold text-slate-900">{formatRupiah(lastOrder.total)}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white hover:bg-emerald-600"
          >
            <MessageCircle size={16} /> Konfirmasi via WhatsApp
          </a>
          <ButtonLink href="/produk" variant="outline">
            <Package size={16} /> Lanjut Belanja
          </ButtonLink>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-slate-500 hover:text-slate-800"
          >
            <Home size={16} /> Beranda
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
