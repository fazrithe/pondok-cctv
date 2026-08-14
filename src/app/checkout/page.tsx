"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { useCartStore } from "@/store/cart";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => {
      if (items.length === 0) router.replace("/keranjang");
    }, 300);
    return () => clearTimeout(id);
  }, [items.length, router]);

  return (
    <div className="bg-white py-10 sm:py-14">
      <Container>
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">Pembayaran</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <CheckoutForm />
          <div className="lg:sticky lg:top-24 lg:self-start">
            <OrderSummary />
          </div>
        </div>
      </Container>
    </div>
  );
}
