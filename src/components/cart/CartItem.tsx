import type { CartItem as CartItemType } from "@/types";
import { CURRENCY } from "@/config";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/store/cartStore";
import { Minus, Plus, Trash2, Package, Sparkles } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  readonly?: boolean;
}

export function CartItemRow({ item, readonly }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 rounded-xl border border-orange-100 bg-white p-3 transition-shadow hover:shadow-sm">
      {/* Image */}
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-orange-50 to-amber-50">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {item.isPack ? (
              <Package className="h-7 w-7 text-purple-300" />
            ) : (
              <Sparkles className="h-7 w-7 text-orange-300" />
            )}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-gray-800">
              {item.name}
            </h4>
            {item.isPack && <Badge variant="pack">Pack</Badge>}
          </div>
          {item.originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              {item.originalPrice.toFixed(2)} {CURRENCY} / unité
            </p>
          )}
          <p className="text-sm font-bold text-orange-600">
            {item.price.toFixed(2)} {CURRENCY}
          </p>
        </div>

        {/* Quantity controls */}
        {!readonly && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-600 transition-colors hover:bg-orange-100"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-gray-700">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-600 transition-colors hover:bg-orange-100"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
        {readonly && (
          <p className="text-sm text-gray-500">Qté: {item.quantity}</p>
        )}
      </div>
    </div>
  );
}
