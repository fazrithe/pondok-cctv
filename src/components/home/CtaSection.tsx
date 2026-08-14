"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import site from "@/data/site.json";

export default function CtaSection() {
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-16 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-white/10" />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl text-balance">
            Butuh Konsultasi Sistem CCTV yang Tepat?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-sm text-brand-100 sm:text-base">
            Tim ahli kami siap membantu menentukan solusi keamanan terbaik sesuai kebutuhan dan
            budget Anda — gratis konsultasi kapan saja.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/produk" size="lg" variant="light">
              Belanja Sekarang <ArrowRight size={18} />
            </ButtonLink>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle size={18} /> Chat WhatsApp
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
