"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import site from "@/data/site.json";

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.25),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(5,150,105,0.2),transparent_45%)]" />
      <Container className="relative grid grid-cols-2 gap-8 sm:grid-cols-4">
        {site.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl font-extrabold text-white sm:text-4xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-2 text-xs font-medium text-slate-400 sm:text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </Container>
    </section>
  );
}
