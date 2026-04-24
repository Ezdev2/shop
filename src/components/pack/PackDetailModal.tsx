import { useEffect } from "react";
import type { Pack } from "@/types";
import { CURRENCY } from "@/config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import {
  X,
  ShoppingBag,
  Package,
  Tag,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

interface PackDetailModalProps {
  pack: Pack;
  onClose: () => void;
}

export function PackDetailModal({ pack, onClose }: PackDetailModalProps) {
  const addPack = useCartStore((s) => s.addPack);
  const products = useProductStore((s) => s.products);
  const savings = pack.originalTotalPrice - pack.packPrice;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleAdd = () => {
    addPack(pack);
    toast.success(`Pack "${pack.name}" ajouté au panier`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl animate-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header image */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl bg-gradient-to-br from-violet-50 via-purple-50 to-orange-50">
          {pack.image ? (
            <img
              src={pack.image}
              alt={pack.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="h-16 w-16 text-purple-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
          <div className="absolute left-4 top-4">
            <Badge variant="pack">-{pack.discount}%</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <h2 className="mb-2 text-xl font-bold text-gray-800">{pack.name}</h2>
          <p className="mb-5 text-sm leading-relaxed text-gray-500">
            {pack.description}
          </p>

          {/* Price */}
          <div className="mb-5 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 p-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-purple-600">
                {pack.packPrice.toFixed(2)} {CURRENCY}
              </span>
              <span className="text-base text-gray-400 line-through">
                {pack.originalTotalPrice.toFixed(2)} {CURRENCY}
              </span>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <Tag className="h-3.5 w-3.5" />
              Vous économisez {savings.toFixed(2)} {CURRENCY}
            </p>
          </div>

          {/* Included products */}
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Sparkles className="h-4 w-4 text-purple-500" />
              Ce pack contient
            </h3>
            <div className="space-y-2">
              {pack.includedProducts.map((pp) => {
                const product = products.find((p) => p.id === pp.productId);
                return (
                  <div
                    key={pp.productId}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-colors hover:border-purple-200 hover:bg-purple-50/30"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-50 to-orange-50">
                      {product?.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={pp.productName}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      ) : (
                        <Package className="h-5 w-5 text-purple-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {pp.productName}
                      </p>
                      {product && (
                        <p className="text-xs text-gray-400">
                          {product.price.toFixed(2)} {CURRENCY}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <span>Qté: {pp.quantity}</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add to cart */}
          <Button onClick={handleAdd} className="w-full" size="lg">
            <ShoppingBag className="h-4 w-4" />
            Ajouter le pack au panier
          </Button>
        </div>
      </div>
    </div>
  );
}
