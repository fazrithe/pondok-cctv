import Link from "next/link";
import { Video, MapPin, Phone, Mail, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import site from "@/data/site.json";
import categories from "@/data/categories.json";
import type { Category } from "@/types";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <Container className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
              <Video size={20} className="text-white" strokeWidth={2.2} />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              {site.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">{site.description}</p>
          <div className="mt-5 flex items-center gap-3">
            {[
              { key: "IG", href: site.social.instagram, label: "Instagram" },
              { key: "FB", href: site.social.facebook, label: "Facebook" },
              { key: "TT", href: site.social.tiktok, label: "TikTok" },
              { key: "YT", href: site.social.youtube, label: "Youtube" },
            ].map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-500 shadow-sm transition-colors hover:bg-brand-600 hover:text-white"
              >
                {s.key}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Kategori</h3>
          <ul className="mt-4 space-y-2.5">
            {(categories as Category[]).slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <Link href={`/produk?category=${cat.slug}`} className="text-sm text-slate-600 hover:text-brand-600">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Perusahaan</h3>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/tentang" className="text-sm text-slate-600 hover:text-brand-600">Tentang Kami</Link></li>
            <li><Link href="/produk" className="text-sm text-slate-600 hover:text-brand-600">Semua Produk</Link></li>
            <li><Link href="/promo" className="text-sm text-slate-600 hover:text-brand-600">Promo</Link></li>
            <li><Link href="/kontak" className="text-sm text-slate-600 hover:text-brand-600">Kontak</Link></li>
            <li><Link href="/keranjang" className="text-sm text-slate-600 hover:text-brand-600">Keranjang</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Hubungi Kami</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2.5 text-sm text-slate-600">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-500" />
              {site.address}
            </li>
            <li className="flex items-center gap-2.5 text-sm text-slate-600">
              <Phone size={16} className="shrink-0 text-brand-500" />
              {site.phone}
            </li>
            <li className="flex items-center gap-2.5 text-sm text-slate-600">
              <Mail size={16} className="shrink-0 text-brand-500" />
              {site.email}
            </li>
            <li className="flex items-center gap-2.5 text-sm text-slate-600">
              <Clock size={16} className="shrink-0 text-brand-500" />
              {site.operationalHours}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-slate-200">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {year} {site.name}. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-xs text-slate-400">Dibuat dengan Next.js &amp; Framer Motion</p>
        </Container>
      </div>
    </footer>
  );
}
