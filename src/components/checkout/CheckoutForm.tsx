import type { OrderFormData } from "@/types";
import { User, Phone, MapPin, Package } from "lucide-react";

interface CheckoutFormProps {
  form: OrderFormData;
  totalItems: number;
  onChange: (field: keyof OrderFormData, value: string) => void;
}

export function CheckoutForm({ form, onChange, totalItems }: CheckoutFormProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-gray-800">
        Informations de livraison
      </h2>

      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
          <User className="h-3.5 w-3.5 text-orange-400" />
          Nom complet *
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Votre nom"
          className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-200 placeholder:text-gray-300"
        />
      </div>

      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
          <Phone className="h-3.5 w-3.5 text-orange-400" />
          Téléphone *
        </label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="06 XX XX XX XX"
          className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-200 placeholder:text-gray-300"
        />
      </div>

      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-700">
          <MapPin className="h-3.5 w-3.5 text-orange-400" />
          Adresse de livraison *
        </label>
        <textarea
          required
          value={form.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="Votre adresse complète"
          rows={3}
          className="w-full resize-none rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-200 placeholder:text-gray-300"
        />
      </div>

      <div className="rounded-xl bg-orange-50/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
            <Package className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              Nombre de produits
            </p>
            <p className="text-lg font-bold text-orange-600">
              {totalItems} article{totalItems !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
