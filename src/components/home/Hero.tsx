"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star, ArrowRight, PlayCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import CctvAnimation from "@/components/home/CctvAnimation";
import site from "@/data/site.json";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <Container className="relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
          >
            <ShieldCheck size={14} className="text-emerald-500" />
            Toko CCTV Terpercaya #1 di Indonesia
          </motion.div>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] text-balance">
            Pengawasan Cerdas untuk{" "}
            <span className="relative inline-block text-brand-600">
              Rumah &amp; Bisnis
              <motion.svg
                viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 w-full text-brand-300"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
              >
                <motion.path
                  d="M2 9 Q 50 2 100 7 T 198 5"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>{" "}
            Anda
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
            {site.tagline}. Belanja kamera CCTV, DVR/NVR, dan paket lengkap dengan kualitas
            terjamin, harga bersaing, serta layanan instalasi profesional ke seluruh Indonesia.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="/produk" size="lg">
              Belanja Sekarang <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="/tentang" size="lg" variant="outline">
              <PlayCircle size={18} /> Lihat Cara Kerja
            </ButtonLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {["#2563eb", "#059669", "#7c3aed", "#d97706"].map((c) => (
                  <span
                    key={c}
                    className="h-9 w-9 rounded-full border-2 border-white"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 font-bold text-slate-800">
                  4.8 <Star size={14} className="fill-amber-400 text-amber-400" />
                </div>
                <div className="text-xs text-slate-400">dari 12.500+ pelanggan</div>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-sm">
              <div className="font-bold text-slate-800">Garansi Resmi</div>
              <div className="text-xs text-slate-400">1-2 tahun semua produk</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <CctvAnimation />
        </motion.div>
      </Container>
    </section>
  );
}
