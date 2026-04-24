import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { CURRENCY } from "@/config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addProduct = useCartStore((s) => s.addProduct);
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  const discountedPrice = product.isPromotion
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addProduct(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-orange-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100/40"
    >
      {/* Image */}
      <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-amber-50">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Sparkles className="h-10 w-10 text-orange-300" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isPromotion && (
            <Badge variant="promotion">-{product.discountPercentage}%</Badge>
          )}
          {outOfStock && <Badge variant="out-of-stock">Épuisé</Badge>}
          {lowStock && (
            <Badge variant="low-stock">Plus que {product.stock} !</Badge>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-orange-400">
          {product.category}
        </p>
        <h3 className="mb-1 text-sm font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        <p className="mb-3 text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Price + Button */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            {product.isPromotion ? (
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-orange-600">
                  {discountedPrice.toFixed(2)} {CURRENCY}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {product.price.toFixed(2)} {CURRENCY}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-orange-600">
                {product.price.toFixed(2)} {CURRENCY}
              </span>
            )}
          </div>
          <Button
            size="sm"
            disabled={outOfStock}
            onClick={handleAdd}
          >
            {outOfStock ? (
              "Épuisé"
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                Ajouter
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}
