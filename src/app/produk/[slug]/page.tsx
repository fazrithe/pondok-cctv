import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import Container from "@/components/ui/Container";
import RatingStars from "@/components/ui/RatingStars";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCartPanel from "@/components/product/AddToCartPanel";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import { formatRupiah, discountPercent } from "@/lib/format";
import type { Product, Category } from "@/types";

const products = productsData as unknown as Product[];
const categories = categoriesData as Category[];

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Produk Tidak Ditemukan" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.category);
  const discount = discountPercent(product.price, product.originalPrice);

  return (
    <div className="bg-white py-8 sm:py-12">
      <Container>
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <Link href="/" className="hover:text-brand-600">Beranda</Link>
          <ChevronRight size={12} />
          <Link href="/produk" className="hover:text-brand-600">Produk</Link>
          {category ? (
            <>
              <ChevronRight size={12} />
              <Link href={`/produk?category=${category.slug}`} className="hover:text-brand-600">
                {category.name}
              </Link>
            </>
          ) : null}
          <ChevronRight size={12} />
          <span className="text-slate-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery product={product} />

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">{product.brand}</span>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <RatingStars rating={product.rating} size={15} />
              <span className="text-sm text-slate-500">
                {product.rating} ({product.reviewCount} ulasan)
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-sm text-slate-500">Terjual {product.sold}+</span>
            </div>

            <div className="mt-6 flex items-end gap-3 rounded-2xl bg-slate-50 p-5">
              <span className="text-3xl font-extrabold text-slate-900">{formatRupiah(product.price)}</span>
              {product.originalPrice ? (
                <>
                  <span className="text-base text-slate-400 line-through">
                    {formatRupiah(product.originalPrice)}
                  </span>
                  <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-600">
                    Hemat {discount}%
                  </span>
                </>
              ) : null}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-xs text-slate-400">Resolusi</dt>
                <dd className="font-semibold text-slate-700">{product.resolution}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Konektivitas</dt>
                <dd className="font-semibold text-slate-700">{product.connectivity}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">Penempatan</dt>
                <dd className="font-semibold text-slate-700">{product.placement}</dd>
              </div>
            </dl>

            <div className="mt-8 border-t border-slate-100 pt-8">
              <AddToCartPanel product={product} />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 p-3 text-xs text-slate-500">
                <Truck size={18} className="shrink-0 text-brand-500" />
                Gratis ongkir min. Rp1jt
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 p-3 text-xs text-slate-500">
                <ShieldCheck size={18} className="shrink-0 text-brand-500" />
                Garansi resmi 1-2 tahun
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 p-3 text-xs text-slate-500">
                <RotateCcw size={18} className="shrink-0 text-brand-500" />
                7 hari retur mudah
              </div>
            </div>
          </div>
        </div>

        <ProductTabs product={product} />
        <RelatedProducts currentSlug={product.slug} category={product.category} />
      </Container>
    </div>
  );
}
