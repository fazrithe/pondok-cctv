"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import categories from "@/data/categories.json";
import type { Category } from "@/types";

export default function CategoryGrid() {
  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          eyebrow="Kategori Produk"
          title="Temukan Solusi Keamanan yang Tepat"
          description="Dari rumah tinggal hingga bisnis skala besar, kami punya kategori produk lengkap untuk setiap kebutuhan pengawasan Anda."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {(categories as Category[]).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                href={`/produk?category=${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm shadow-slate-900/[0.02] transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/[0.08]"
              >
                <span
                  className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${cat.color}14` }}
                >
                  <Image src={cat.image} alt={cat.name} width={44} height={44} />
                </span>
                <span className="text-xs font-bold text-slate-700 group-hover:text-brand-600">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
