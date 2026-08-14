"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RatingStars from "@/components/ui/RatingStars";
import testimonials from "@/data/testimonials.json";
import type { Testimonial } from "@/types";

export default function Testimonials() {
  return (
    <section className="bg-slate-50/70 py-20">
      <Container>
        <SectionHeading
          eyebrow="Testimoni Pelanggan"
          title="Dipercaya Ribuan Pelanggan di Seluruh Indonesia"
          description="Kepuasan pelanggan adalah prioritas kami. Berikut cerita mereka setelah menggunakan produk Pondok CCTV."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(testimonials as Testimonial[]).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="relative flex flex-col rounded-2xl bg-white p-6 shadow-sm shadow-slate-900/[0.03]"
            >
              <Quote className="absolute right-5 top-5 text-slate-100" size={40} />
              <RatingStars rating={t.rating} />
              <p className="relative mt-4 text-sm leading-relaxed text-slate-600">&ldquo;{t.comment}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: t.avatarColor }}
                >
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-bold text-slate-800">{t.name}</div>
                  <div className="text-xs text-slate-400">
                    {t.role} · {t.city}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
