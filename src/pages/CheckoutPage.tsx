import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { OrderFormData } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { submitOrder } from "@/services/api";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart, totalPrice, totalItems } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<OrderFormData>({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }

    setSubmitting(true);
    try {
      await submitOrder(items, form);
      clearCart();
      toast.success("Commande validée !");
      navigate("/order-success");
    } catch {
      toast.error("Erreur lors de la commande");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-50">
          <ShoppingBag className="h-10 w-10 text-orange-300" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-800">
          Aucun article
        </h1>
        <p className="mt-2 text-gray-500">Votre panier est vide</p>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Finaliser la commande
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <CheckoutForm
            form={form}
            onChange={handleChange}
            totalItems={totalItems()}
          />
          <div className="lg:sticky lg:top-24 lg:self-start">
            <OrderSummary />
            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full"
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Envoi en cours...
                </span>
              ) : (
                `Confirmer la commande — ${totalPrice().toFixed(2)} €`
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
