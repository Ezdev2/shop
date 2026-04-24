import { Link } from "react-router-dom";
import { CURRENCY } from "@/config";
import { useCartStore } from "@/store/cartStore";
import { CartItemRow } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
} from "lucide-react";

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-50">
          <ShoppingBag className="h-10 w-10 text-orange-300" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-800">
          Votre panier est vide
        </h1>
        <p className="mt-2 text-gray-500">
          Ajoutez des produits pour commencer
        </p>
        <Link to="/products" className="mt-6">
          <Button>
            <ArrowRight className="h-4 w-4" />
            Découvrir nos produits
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Mon panier</h1>
        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          Vider le panier
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Résumé
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span>
                  {totalPrice().toFixed(2)} {CURRENCY}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5" />
                  Livraison
                </span>
                <span className="font-medium text-emerald-600">Gratuite</span>
              </div>
            </div>

            <hr className="my-4 border-orange-100" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-orange-600">
                {totalPrice().toFixed(2)} {CURRENCY}
              </span>
            </div>

            <Link to="/checkout" className="mt-6 block">
              <Button className="w-full" size="lg">
                Commander
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link
              to="/products"
              className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-orange-600 transition-colors hover:text-orange-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
