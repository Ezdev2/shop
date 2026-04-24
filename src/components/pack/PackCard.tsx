import { useState } from "react";
import type { Pack } from "@/types";
import { CURRENCY } from "@/config";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";
import { PackDetailModal } from "./PackDetailModal";
import { Package, Tag, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

interface PackCardProps {
  pack: Pack;
}

export function PackCard({ pack }: PackCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const addPack = useCartStore((s) => s.addPack);
  const savings = pack.originalTotalPrice - pack.packPrice;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addPack(pack);
    toast.success(`Pack "${pack.name}" ajouté au panier`);
  };

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="group flex cursor-pointer flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-purple-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100/40"
      >
        {/* Image */}
        <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-orange-50">
          {pack.image ? (
            <img
              src={pack.image}
              alt={pack.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="h-12 w-12 text-purple-300" />
            </div>
          )}
          <div className="absolute left-2 top-2">
            <Badge variant="pack">-{pack.discount}%</Badge>
          </div>
          {/* Click overlay indicator */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/5">
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-purple-600 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
              Voir le détail
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col">
          <h3 className="mb-1 text-sm font-semibold text-gray-800">
            {pack.name}
          </h3>
          <p className="mb-2 text-xs text-gray-500 line-clamp-2">
            {pack.description}
          </p>

          {/* Products in pack */}
          <div className="mb-3 space-y-1">
            {pack.includedProducts.slice(0, 3).map((pp) => (
              <div
                key={pp.productId}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <ChevronRight className="h-3 w-3 flex-shrink-0 text-purple-400" />
                <span className="truncate">
                  {pp.productName}
                  {pp.quantity > 1 && (
                    <span className="text-gray-400"> x{pp.quantity}</span>
                  )}
                </span>
              </div>
            ))}
            {pack.includedProducts.length > 3 && (
              <p className="text-xs text-purple-400 pl-4">
                +{pack.includedProducts.length - 3} autres produits
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mt-auto">
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-xl font-bold text-purple-600">
                {pack.packPrice.toFixed(2)} {CURRENCY}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {pack.originalTotalPrice.toFixed(2)} {CURRENCY}
              </span>
            </div>
            <p className="mb-3 flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <Tag className="h-3 w-3" />
              Économisez {savings.toFixed(2)} {CURRENCY}
            </p>
            <Button onClick={handleAdd} className="w-full" size="sm">
              Ajouter le pack
            </Button>
          </div>
        </div>
      </div>

      {showDetail && (
        <PackDetailModal pack={pack} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
}
