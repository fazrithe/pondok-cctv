"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Wrench, Truck, MessageCircle, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import site from "@/data/site.json";

const ICONS: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  wrench: Wrench,
  truck: Truck,
  "message-circle": MessageCircle,
};

export default function USPSection() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/70 py-16">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.usps.map((usp, i) => {
            const Icon = ICONS[usp.icon] ?? ShieldCheck;
            return (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm shadow-slate-900/[0.03]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{usp.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{usp.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
