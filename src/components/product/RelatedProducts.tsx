import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";
import productsData from "@/data/products.json";
import type { Product } from "@/types";

export default function RelatedProducts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const products = productsData as unknown as Product[];
  const related = products.filter((p) => p.category === category && p.slug !== currentSlug).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-20 border-t border-slate-100 pt-16">
      <SectionHeading align="left" title="Produk Terkait" description="Produk lain yang mungkin Anda suka." />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {related.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
