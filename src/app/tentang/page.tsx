import type { Metadata } from "next";
import { Heart, ShieldCheck, Users, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Timeline from "@/components/about/Timeline";
import StatsSection from "@/components/home/StatsSection";
import CtaSection from "@/components/home/CtaSection";
import CctvAnimation from "@/components/home/CctvAnimation";
import site from "@/data/site.json";
import team from "@/data/team.json";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali lebih dekat Pondok CCTV, toko CCTV terpercaya dengan pengalaman lebih dari 9 tahun melayani kebutuhan keamanan rumah dan bisnis di Indonesia.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Kualitas Terjamin",
    description: "Setiap produk melalui quality check sebelum dikirim ke pelanggan.",
  },
  {
    icon: Heart,
    title: "Kepercayaan Pelanggan",
    description: "Kejujuran dan transparansi adalah prioritas dalam setiap transaksi.",
  },
  {
    icon: Users,
    title: "Pelayanan Terbaik",
    description: "Tim support siap membantu sebelum, saat, dan setelah pembelian.",
  },
  {
    icon: Sparkles,
    title: "Inovasi Berkelanjutan",
    description: "Selalu menghadirkan teknologi keamanan terbaru untuk pelanggan.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600">
              Tentang Kami
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl text-balance">
              Melindungi Apa yang Paling Berharga Bagi Anda
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg">
              Sejak 2016, {site.name} berkomitmen menghadirkan solusi keamanan CCTV berkualitas
              dengan harga terjangkau. Kami percaya setiap rumah dan bisnis berhak mendapatkan rasa
              aman tanpa perlu mengeluarkan biaya berlebih.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <CctvAnimation />
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Nilai Kami" title="Prinsip yang Kami Pegang Teguh" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-slate-100 p-6 text-center shadow-sm shadow-slate-900/[0.03]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <v.icon size={26} />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-slate-800">{v.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50/70 py-16">
        <Container>
          <SectionHeading eyebrow="Perjalanan Kami" title="Cerita di Balik Pondok CCTV" />
          <Timeline />
        </Container>
      </section>

      <StatsSection />

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Tim Kami" title="Orang-Orang di Balik Layanan Kami" />
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.id} delay={i * 0.08} className="text-center">
                <span
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-xl font-extrabold text-white"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </span>
                <h3 className="mt-3 text-sm font-bold text-slate-800">{member.name}</h3>
                <p className="text-xs text-slate-400">{member.role}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </div>
  );
}
