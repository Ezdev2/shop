import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { Percent, ArrowRight } from "lucide-react";

interface PromotionsSectionProps {
  products: Product[];
  loading?: boolean;
}

export function PromotionsSection({ products, loading }: PromotionsSectionProps) {
  const promotions = products.filter((p) => p.isPromotion).slice(0, 4);

  if (!loading && promotions.length === 0) return null;

  return (
    <section className="rounded-3xl bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <Percent className="h-6 w-6 text-red-400" />
            Promotions
          </h2>
          <p className="text-sm text-gray-500">
            Profitez de nos offres exclusives
          </p>
        </div>
        <Link to="/products?promotion=true">
          <Button variant="outline" size="sm">
            Tout voir
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
      <ProductGrid products={promotions} loading={loading} />
    </section>
  );
}
