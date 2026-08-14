"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import site from "@/data/site.json";

export default function MapPanel() {
  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 sm:h-full">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40" />
      <motion.div
        initial={{ y: -6 }}
        animate={{ y: [-6, 2, -6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center"
      >
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30">
          <MapPin size={22} />
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-500/40" />
        </span>
        <div className="mt-3 rounded-xl bg-white px-4 py-2 text-center shadow-md">
          <p className="text-xs font-bold text-slate-800">{site.name}</p>
          <p className="max-w-[180px] text-[11px] text-slate-400">{site.address}</p>
        </div>
      </motion.div>
    </div>
  );
}
