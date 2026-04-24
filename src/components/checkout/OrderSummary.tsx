import { CURRENCY } from "@/config";
import { useCartStore } from "@/store/cartStore";
import { CartItemRow } from "@/components/cart/CartItem";
import { Receipt } from "lucide-react";

export function OrderSummary() {
  const { items, totalPrice } = useCartStore();

  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
        <Receipt className="h-5 w-5 text-orange-400" />
        Récapitulatif
      </h2>
      <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} readonly />
        ))}
      </div>
      <div className="rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Total</span>
          <span className="text-xl font-bold text-orange-600">
            {totalPrice().toFixed(2)} {CURRENCY}
          </span>
        </div>
      </div>
    </div>
  );
}
