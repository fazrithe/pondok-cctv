"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import milestones from "@/data/milestones.json";

export default function Timeline() {
  return (
    <div className="relative mt-12">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 sm:left-1/2" />
      <div className="space-y-10">
        {milestones.map((m, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={cn(
                "relative sm:w-1/2",
                isLeft ? "sm:pr-10" : "sm:ml-auto sm:pl-10"
              )}
            >
              <span
                className={cn(
                  "absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-600 ring-4 ring-brand-100 sm:top-6",
                  isLeft ? "sm:left-auto sm:right-0 sm:translate-x-1/2" : "sm:left-0 sm:-translate-x-1/2"
                )}
              />
              <div className="ml-10 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:ml-0">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">{m.year}</span>
                <h3 className="mt-1 text-base font-bold text-slate-800">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{m.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
