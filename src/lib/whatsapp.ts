import site from "@/data/site.json";
import { formatRupiah } from "@/lib/format";
import type { CartItem, Product } from "@/types";

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Membuka WhatsApp pada tab baru dengan pesan pesanan yang sudah terisi. */
export function openWhatsApp(message: string): void {
  window.open(waLink(message), "_blank", "noopener,noreferrer");
}

function itemLine(item: CartItem, index: number): string {
  return `${index + 1}. ${item.product.name}\n   ${item.qty} x ${formatRupiah(
    item.product.price
  )} = ${formatRupiah(item.product.price * item.qty)}`;
}

/** Pesan pemesanan untuk satu produk dari halaman detail. */
export function productOrderMessage(product: Product, qty: number): string {
  const link =
    typeof window === "undefined" ? "" : `${window.location.origin}/produk/${product.slug}`;

  return [
    `Halo ${site.name}, saya ingin memesan produk berikut:`,
    "",
    itemLine({ product, qty }, 0),
    "",
    `Total: ${formatRupiah(product.price * qty)}`,
    link ? `Link produk: ${link}` : "",
    "",
    "Mohon info ketersediaan dan proses pemesanannya. Terima kasih.",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

/** Pesan pemesanan untuk seluruh isi keranjang. */
export function cartOrderMessage(items: CartItem[], shipping: number): string {
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.product.price, 0);

  return [
    `Halo ${site.name}, saya ingin memesan produk berikut:`,
    "",
    items.map(itemLine).join("\n"),
    "",
    `Subtotal: ${formatRupiah(subtotal)}`,
    `Ongkos kirim: ${shipping === 0 ? "Gratis" : formatRupiah(shipping)}`,
    `Total: ${formatRupiah(subtotal + shipping)}`,
    "",
    "Mohon info ketersediaan dan proses pemesanannya. Terima kasih.",
  ].join("\n");
}
