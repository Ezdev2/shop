import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

interface FeaturedProductsProps {
  products: Product[];
  loading?: boolean;
}

export function FeaturedProducts({ products, loading }: FeaturedProductsProps) {
  const featured = products.slice(0, 4);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Produits vedettes</h2>
          <p className="text-sm text-gray-500">Nos incontournables du moment</p>
        </div>
        <Link to="/products">
          <Button variant="outline" size="sm">
            Tout voir
          </Button>
        </Link>
      </div>
      <ProductGrid products={featured} loading={loading} />
    </section>
  );
}
