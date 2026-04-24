import { useParams, Link } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { CURRENCY } from "@/config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  ShoppingCart,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { products, loading, loadProducts } = useProductStore();
  const addProduct = useCartStore((s) => s.addProduct);

  if (products.length === 0 && !loading) {
    loadProducts();
  }

  const product = products.find((p) => p.id === id);

  if (loading || !product) {
    return (
      <div className="pb-12">
        <Skeleton className="mb-6 h-8 w-1/3" />
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;
  const discountedPrice = product.isPromotion
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  const handleAdd = () => {
    if (outOfStock) return;
    addProduct(product);
    toast.success(`${product.name} ajouté au panier`);
  };

  return (
    <div className="pb-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <Link to="/" className="transition-colors hover:text-orange-600">
          Accueil
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          to="/products"
          className="transition-colors hover:text-orange-600"
        >
          Produits
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div className="space-y-3">
          <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50">
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Sparkles className="h-16 w-16 text-orange-300" />
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="h-20 w-20 overflow-hidden rounded-xl bg-orange-50 ring-1 ring-orange-100"
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {product.isPromotion && (
              <Badge variant="promotion">-{product.discountPercentage}%</Badge>
            )}
            {outOfStock && <Badge variant="out-of-stock">Épuisé</Badge>}
            {lowStock && (
              <Badge variant="low-stock">Plus que {product.stock} !</Badge>
            )}
          </div>

          <p className="mb-1 text-sm font-medium uppercase tracking-wide text-orange-400">
            {product.category}
          </p>
          <h1 className="mb-3 text-2xl font-bold text-gray-800">
            {product.name}
          </h1>
          <p className="mb-6 leading-relaxed text-gray-600">
            {product.description}
          </p>

          {/* Price */}
          <div className="mb-6">
            {product.isPromotion ? (
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-orange-600">
                  {discountedPrice.toFixed(2)} {CURRENCY}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {product.price.toFixed(2)} {CURRENCY}
                </span>
                <Badge variant="promotion">
                  -{product.discountPercentage}%
                </Badge>
              </div>
            ) : (
              <span className="text-3xl font-bold text-orange-600">
                {product.price.toFixed(2)} {CURRENCY}
              </span>
            )}
          </div>

          {/* Stock info */}
          <div className="mb-6">
            {outOfStock ? (
              <p className="flex items-center gap-2 text-sm font-medium text-red-500">
                <XCircle className="h-4 w-4" />
                Produit actuellement indisponible
              </p>
            ) : lowStock ? (
              <p className="flex items-center gap-2 text-sm font-medium text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                Plus que {product.stock} exemplaire
                {product.stock > 1 ? "s" : ""} en stock
              </p>
            ) : (
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                <CheckCircle className="h-4 w-4" />
                En stock
              </p>
            )}
          </div>

          {/* Add to cart */}
          <Button
            size="lg"
            className="w-full"
            disabled={outOfStock}
            onClick={handleAdd}
          >
            <ShoppingCart className="h-5 w-5" />
            {outOfStock ? "Produit épuisé" : "Ajouter au panier"}
          </Button>
        </div>
      </div>
    </div>
  );
}
