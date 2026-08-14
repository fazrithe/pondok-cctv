"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface LastOrder {
  orderNumber: string;
  items: CartItem[];
  total: number;
  customerName: string;
  paymentMethod: string;
  createdAt: string;
}

interface CartState {
  items: CartItem[];
  lastOrder: LastOrder | null;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  setLastOrder: (order: LastOrder) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      lastOrder: null,
      addItem: (product, qty = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
              ),
            };
          }
          return { items: [...state.items, { product, qty }] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }));
      },
      updateQty: (productId, qty) => {
        set((state) => ({
          items: state.items
            .map((i) => (i.product.id === productId ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        }));
      },
      clear: () => set({ items: [] }),
      setLastOrder: (order) => set({ lastOrder: order }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.qty * i.product.price, 0),
    }),
    {
      name: "pondok-cctv-cart",
      partialize: (state) => ({ items: state.items, lastOrder: state.lastOrder }),
      skipHydration: true,
    }
  )
);
