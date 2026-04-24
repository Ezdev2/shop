import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PacksPreview } from "@/components/home/PacksPreview";
import { PromotionsSection } from "@/components/home/PromotionsSection";
import { CategoriesPreview } from "@/components/home/CategoriesPreview";

export default function HomePage() {
  const { products, packs, loading, loadAll } = useProductStore();

  useEffect(() => {
    if (products.length === 0 && packs.length === 0) {
      loadAll();
    }
  }, [loadAll, products.length, packs.length]);

  return (
    <div className="space-y-12 pb-12">
      <HeroBanner />
      <CategoriesPreview />
      <FeaturedProducts products={products} loading={loading} />
      <PacksPreview packs={packs} loading={loading} />
      <PromotionsSection products={products} loading={loading} />
    </div>
  );
}
