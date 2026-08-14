"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base text-slate-500 sm:text-lg text-balance">{description}</p>
      ) : null}
    </motion.div>
  );
}
