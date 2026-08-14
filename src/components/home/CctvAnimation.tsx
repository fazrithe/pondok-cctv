"use client";

import { motion } from "framer-motion";
import { Cloud, ShieldCheck, Wifi, Video } from "lucide-react";

const chips = [
  { label: "Full HD 1080p", icon: Video, className: "left-[2%] top-[8%]", delay: 0.2 },
  { label: "Night Vision", icon: ShieldCheck, className: "right-[0%] top-[18%]", delay: 0.5 },
  { label: "Cloud Backup", icon: Cloud, className: "left-[0%] bottom-[16%]", delay: 0.8 },
  { label: "WiFi Ready", icon: Wifi, className: "right-[4%] bottom-[6%]", delay: 1.1 },
];

export default function CctvAnimation() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* soft glow blobs */}
      <motion.div
        aria-hidden
        className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-brand-200/50 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-10 -right-4 h-64 w-64 rounded-full bg-emerald-200/50 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* radar rings */}
      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full">
        <g transform="translate(300,210)">
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="0"
              cy="0"
              r="10"
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.5"
              initial={{ opacity: 0, r: 10 }}
              animate={{ opacity: [0.5, 0], r: [10, 170] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1.2,
              }}
            />
          ))}
        </g>
      </svg>

      {/* main illustration */}
      <svg viewBox="0 0 520 520" className="relative h-full w-full drop-shadow-[0_30px_60px_rgba(37,99,235,0.18)]">
        <defs>
          <linearGradient id="camBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="camAccent" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>

        {/* wall mount plate */}
        <rect x="255" y="70" width="70" height="60" rx="10" fill="#e2e8f0" />
        <rect x="270" y="120" width="40" height="26" fill="#cbd5e1" />

        {/* dashed field of view, rotates with head */}
        <motion.g
          style={{ transformOrigin: "300px 210px" }}
          animate={{ rotate: [-16, 16, -16] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.path
            d="M 300 210 L 150 400 A 250 250 0 0 0 450 400 Z"
            fill="url(#camAccent)"
            opacity="0.08"
          />
          <path d="M 300 210 L 150 400" stroke="#93c5fd" strokeWidth="2" strokeDasharray="6 8" opacity="0.5" />
          <path d="M 300 210 L 450 400" stroke="#93c5fd" strokeWidth="2" strokeDasharray="6 8" opacity="0.5" />

          {/* camera arm */}
          <rect x="285" y="140" width="30" height="55" rx="8" fill="#94a3b8" />

          {/* camera body (bullet style) */}
          <g>
            <rect x="220" y="180" width="160" height="80" rx="26" fill="url(#camBody)" />
            <rect x="220" y="180" width="160" height="80" rx="26" fill="none" stroke="#334155" strokeWidth="2" />
            {/* lens housing */}
            <circle cx="365" cy="220" r="46" fill="#0b1220" stroke="#334155" strokeWidth="3" />
            <circle cx="365" cy="220" r="30" fill="#1e293b" />
            <circle cx="365" cy="220" r="16" fill="#0f172a" />
            <circle cx="357" cy="211" r="6" fill="#ffffff" opacity="0.5" />
            {/* accent ring */}
            <circle cx="365" cy="220" r="46" fill="none" stroke="url(#camAccent)" strokeWidth="3" opacity="0.7" />
            {/* rec dot */}
            <motion.circle
              cx="245"
              cy="205"
              r="7"
              fill="#f43f5e"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <text x="258" y="210" fontSize="12" fontWeight="700" fill="#e2e8f0" fontFamily="sans-serif">
              REC
            </text>
            {/* IR LEDs */}
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={335 + i * 12} cy={248} r="3.5" fill="#334155" />
            ))}
          </g>
        </motion.g>

        {/* floating platform / base shadow */}
        <ellipse cx="300" cy="470" rx="150" ry="14" fill="#2563eb" opacity="0.06" />
      </svg>

      {/* floating feature chips */}
      {chips.map(({ label, icon: Icon, className, delay }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.6, delay },
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay },
          }}
          className={`absolute flex items-center gap-2 rounded-full border border-slate-100 bg-white/95 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur ${className}`}
        >
          <Icon size={14} className="text-brand-600" />
          {label}
        </motion.div>
      ))}
    </div>
  );
}
