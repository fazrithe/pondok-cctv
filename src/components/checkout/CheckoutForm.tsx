"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Landmark, Wallet, Truck, Loader2, Check } from "lucide-react";
import { useCartStore } from "@/store/cart";

const PAYMENT_METHODS = [
  {
    key: "transfer",
    label: "Transfer Bank",
    description: "BCA, Mandiri, BNI, BRI",
    icon: Landmark,
  },
  {
    key: "ewallet",
    label: "E-Wallet",
    description: "GoPay, OVO, DANA, ShopeePay",
    icon: Wallet,
  },
  {
    key: "cod",
    label: "Bayar di Tempat (COD)",
    description: "Bayar saat barang tiba",
    icon: Truck,
  },
] as const;

interface FormState {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
};

export default function CheckoutForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [payment, setPayment] = useState<(typeof PAYMENT_METHODS)[number]["key"]>("transfer");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clear = useCartStore((s) => s.clear);
  const setLastOrder = useCartStore((s) => s.setLastOrder);
  const router = useRouter();

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Nama wajib diisi";
    if (!form.phone.trim()) next.phone = "Nomor HP wajib diisi";
    else if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) next.phone = "Nomor HP tidak valid";
    if (!form.address.trim()) next.address = "Alamat wajib diisi";
    if (!form.city.trim()) next.city = "Kota wajib diisi";
    if (!form.postalCode.trim()) next.postalCode = "Kode pos wajib diisi";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    setSubmitting(true);
    const shipping = totalPrice >= 1_000_000 ? 0 : 25_000;
    const orderNumber = `PC-${Date.now().toString().slice(-8)}`;

    setTimeout(() => {
      setLastOrder({
        orderNumber,
        items,
        total: totalPrice + shipping,
        customerName: form.name,
        paymentMethod: PAYMENT_METHODS.find((p) => p.key === payment)?.label ?? payment,
        createdAt: new Date().toISOString(),
      });
      clear();
      setSubmitting(false);
      router.push("/checkout/sukses");
    }, 1400);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h2 className="text-base font-bold text-slate-800">Informasi Pengiriman</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nama Lengkap" error={errors.name}>
            <input
              value={form.name}
              onChange={update("name")}
              placeholder="Nama penerima"
              className={inputClass(!!errors.name)}
            />
          </Field>
          <Field label="Nomor HP / WhatsApp" error={errors.phone}>
            <input
              value={form.phone}
              onChange={update("phone")}
              placeholder="08xx xxxx xxxx"
              className={inputClass(!!errors.phone)}
            />
          </Field>
          <Field label="Email (opsional)">
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="nama@email.com"
              className={inputClass(false)}
            />
          </Field>
          <Field label="Kode Pos" error={errors.postalCode}>
            <input
              value={form.postalCode}
              onChange={update("postalCode")}
              placeholder="40111"
              className={inputClass(!!errors.postalCode)}
            />
          </Field>
          <Field label="Kota / Kabupaten" error={errors.city} className="sm:col-span-2">
            <input
              value={form.city}
              onChange={update("city")}
              placeholder="Bandung"
              className={inputClass(!!errors.city)}
            />
          </Field>
          <Field label="Alamat Lengkap" error={errors.address} className="sm:col-span-2">
            <textarea
              value={form.address}
              onChange={update("address")}
              rows={3}
              placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan"
              className={inputClass(!!errors.address)}
            />
          </Field>
          <Field label="Catatan (opsional)" className="sm:col-span-2">
            <textarea
              value={form.notes}
              onChange={update("notes")}
              rows={2}
              placeholder="Contoh: titip di satpam, hubungi dulu sebelum kirim, dll."
              className={inputClass(false)}
            />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="text-base font-bold text-slate-800">Metode Pembayaran</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon;
            const active = payment === method.key;
            return (
              <button
                type="button"
                key={method.key}
                onClick={() => setPayment(method.key)}
                className={`relative flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition-colors ${
                  active ? "border-brand-500 bg-brand-50/50" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="payment-check"
                    className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white"
                  >
                    <Check size={12} />
                  </motion.span>
                )}
                <Icon size={22} className={active ? "text-brand-600" : "text-slate-400"} />
                <div>
                  <div className="text-sm font-bold text-slate-800">{method.label}</div>
                  <div className="text-xs text-slate-400">{method.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={submitting || items.length === 0}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-4 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Memproses Pesanan...
          </>
        ) : (
          "Buat Pesanan"
        )}
      </motion.button>
      <p className="text-center text-xs text-slate-400">
        Dengan melanjutkan, Anda menyetujui Syarat &amp; Ketentuan serta Kebijakan Privasi Pondok CCTV.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-rose-500">{error}</span> : null}
    </label>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2 ${
    hasError
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
      : "border-slate-200 focus:border-brand-400 focus:ring-brand-100"
  }`;
}
