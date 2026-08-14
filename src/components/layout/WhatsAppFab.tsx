"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import site from "@/data/site.json";

export default function WhatsAppFab() {
  return (
    <motion.a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Halo Pondok CCTV, saya ingin bertanya tentang produk CCTV.")}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
      aria-label="Chat WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
      <MessageCircle size={24} className="relative" />
    </motion.a>
  );
}
