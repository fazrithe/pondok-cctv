"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initial: FormState = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Nama wajib diisi";
    if (!form.email.trim()) next.email = "Email wajib diisi";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Format email tidak valid";
    if (!form.subject.trim()) next.subject = "Subjek wajib diisi";
    if (!form.message.trim()) next.message = "Pesan wajib diisi";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("sent");
      setForm(initial);
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nama Lengkap" error={errors.name}>
          <input value={form.name} onChange={update("name")} placeholder="Nama Anda" className={inputClass(!!errors.name)} />
        </Field>
        <Field label="Email" error={errors.email}>
          <input value={form.email} onChange={update("email")} placeholder="nama@email.com" className={inputClass(!!errors.email)} />
        </Field>
      </div>
      <Field label="Subjek" error={errors.subject}>
        <input value={form.subject} onChange={update("subject")} placeholder="Tentang apa pesan ini?" className={inputClass(!!errors.subject)} />
      </Field>
      <Field label="Pesan" error={errors.message}>
        <textarea
          value={form.message}
          onChange={update("message")}
          rows={5}
          placeholder="Tulis pertanyaan atau kebutuhan Anda di sini..."
          className={inputClass(!!errors.message)}
        />
      </Field>

      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 disabled:opacity-70 sm:w-auto sm:px-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "loading" ? (
            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" /> Mengirim...
            </motion.span>
          ) : status === "sent" ? (
            <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <CheckCircle2 size={16} /> Pesan Terkirim
            </motion.span>
          ) : (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Send size={16} /> Kirim Pesan
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
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
