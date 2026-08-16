"use client";

import { MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatRupiah } from "@/lib/format";
import { useCartStore } from "@/store/cart";
import { cartOrderMessage, openWhatsApp } from "@/lib/whatsapp";

export default function CartSummary() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());

  const shipping = items.length === 0 ? 0 : totalPrice >= 1_000_000 ? 0 : 25_000;
  const grandTotal = totalPrice + shipping;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-900/[0.03]">
      <h3 className="text-base font-bold text-slate-800">Ringkasan Belanja</h3>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-700">{formatRupiah(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Ongkos Kirim</span>
          <span className="font-semibold text-slate-700">
            {shipping === 0 ? <span className="text-emerald-600">Gratis</span> : formatRupiah(shipping)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-slate-100 pt-4">
        <span className="text-sm font-bold text-slate-800">Total</span>
        <span className="text-lg font-extrabold text-slate-900">{formatRupiah(grandTotal)}</span>
      </div>

      <Button
        onClick={() => openWhatsApp(cartOrderMessage(items, shipping))}
        disabled={items.length === 0}
        variant="whatsapp"
        className="mt-6 w-full"
        size="md"
      >
        <MessageCircle size={16} /> Pesan via WhatsApp
      </Button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
        <ShieldCheck size={13} /> Pesanan dikonfirmasi langsung oleh tim kami
      </p>
    </div>
  );
}
