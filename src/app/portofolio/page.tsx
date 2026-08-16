import type { Metadata } from "next";
import { Camera, MapPin, Building2, CalendarCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import CtaSection from "@/components/home/CtaSection";
import portfolioData from "@/data/portfolio.json";
import { formatNumber } from "@/lib/format";
import type { PortfolioItem } from "@/types";

export const metadata: Metadata = {
  title: "Portofolio Kegiatan",
  description:
    "Dokumentasi foto kegiatan pemasangan CCTV Pondok CCTV di rumah, ruko, kantor, sekolah, hingga pabrik di wilayah Cilegon, Serang, dan sekitarnya.",
};

const items = portfolioData as PortfolioItem[];

export default function PortfolioPage() {
  const totalCameras = items.reduce((sum, item) => sum + item.cameras, 0);
  const totalCities = new Set(items.map((item) => item.location.split(",")[0].trim())).size;
  const latest = items.reduce((a, b) => (a.date > b.date ? a : b));

  const stats = [
    { icon: Building2, label: "Lokasi Terpasang", value: `${items.length}+` },
    { icon: Camera, label: "Kamera Terpasang", value: `${formatNumber(totalCameras)}+` },
    { icon: MapPin, label: "Area Layanan", value: `${totalCities} Kota` },
    { icon: CalendarCheck, label: "Proyek Terbaru", value: latest.location.split(",")[0].trim() },
  ];

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600">
              Portofolio
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl text-balance">
              Dokumentasi Kegiatan Pemasangan CCTV Kami
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
              Setiap proyek punya cerita. Berikut foto kegiatan tim teknisi Pondok CCTV beserta nama
              tempat dan lokasi pemasangannya — dari rumah tinggal sampai kawasan industri.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm shadow-slate-900/[0.03]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <stat.icon size={22} />
                  </span>
                  <span className="mt-3 text-xl font-extrabold text-slate-900">{stat.value}</span>
                  <span className="mt-1 text-xs font-semibold text-slate-400">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-14">
        <Container>
          <SectionHeading
            eyebrow="Galeri Kegiatan"
            title="Tempat yang Sudah Kami Amankan"
            description="Klik salah satu kegiatan untuk melihat foto lengkap beserta detail pemasangannya."
          />
          <div className="mt-12">
            <PortfolioGallery />
          </div>
        </Container>
      </section>

      <CtaSection />
    </div>
  );
}
