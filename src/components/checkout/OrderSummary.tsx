"use client";

import Image from "next/image";
import { formatRupiah } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export default function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const shipping = totalPrice >= 1_000_000 ? 0 : 25_000;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-900/[0.03]">
      <h3 className="text-base font-bold text-slate-800">Ringkasan Pesanan</h3>

      <div className="mt-4 max-h-72 space-y-4 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-50">
              <Image src={item.product.images[0]} alt={item.product.name} fill sizes="56px" className="object-cover" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                {item.qty}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-xs font-semibold text-slate-700">{item.product.name}</p>
              <p className="text-xs text-slate-400">{formatRupiah(item.product.price)}</p>
            </div>
            <p className="shrink-0 text-xs font-bold text-slate-800">
              {formatRupiah(item.product.price * item.qty)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-sm">
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
        <div className="flex justify-between border-t border-slate-100 pt-3">
          <span className="text-sm font-bold text-slate-800">Total</span>
          <span className="text-lg font-extrabold text-slate-900">{formatRupiah(totalPrice + shipping)}</span>
        </div>
      </div>
    </div>
  );
}
