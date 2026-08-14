import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import MapPanel from "@/components/contact/MapPanel";
import site from "@/data/site.json";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi Pondok CCTV untuk konsultasi produk, instalasi, atau pertanyaan seputar sistem keamanan CCTV.",
};

const INFO_CARDS = [
  { icon: MapPin, label: "Alamat Toko", value: site.address },
  { icon: Phone, label: "Telepon / WhatsApp", value: site.phone },
  { icon: Mail, label: "Email", value: site.email },
  { icon: Clock, label: "Jam Operasional", value: site.operationalHours },
];

export default function ContactPage() {
  return (
    <div className="bg-white py-10 sm:py-14">
      <Container>
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">Kontak</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Hubungi Kami
          </h1>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Punya pertanyaan seputar produk atau butuh bantuan menentukan sistem CCTV yang tepat?
            Tim kami siap membantu Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {INFO_CARDS.map((card) => (
                <div key={card.label} className="rounded-2xl border border-slate-100 p-5 shadow-sm shadow-slate-900/[0.03]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <card.icon size={20} />
                  </span>
                  <p className="mt-3 text-xs font-semibold text-slate-400">{card.label}</p>
                  <p className="mt-1 text-sm font-bold text-slate-800">{card.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <MapPanel />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-slate-100 p-6 shadow-sm shadow-slate-900/[0.03] sm:p-8">
              <h2 className="text-lg font-bold text-slate-800">Kirim Pesan</h2>
              <p className="mt-1 mb-6 text-sm text-slate-500">
                Isi formulir di bawah dan tim kami akan segera menghubungi Anda kembali.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
