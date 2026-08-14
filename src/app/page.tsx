import Hero from "@/components/home/Hero";
import USPSection from "@/components/home/USPSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import PromoCarousel from "@/components/home/PromoCarousel";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StatsSection from "@/components/home/StatsSection";
import Testimonials from "@/components/home/Testimonials";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <USPSection />
      <CategoryGrid />
      <PromoCarousel />
      <FeaturedProducts />
      <StatsSection />
      <Testimonials />
      <CtaSection />
    </>
  );
}
