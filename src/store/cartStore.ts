import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, Pack } from "@/types";

interface CartState {
  items: CartItem[];
  addProduct: (product: Product) => void;
  addPack: (pack: Pack) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addProduct: (product: Product) => {
        const { items } = get();
        const existing = items.find(
          (i) => i.productId === product.id && i.type === "product"
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === existing.id
                ? { ...i, quantity: Math.min(i.quantity + 1, product.stock) }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: `cart-${product.id}-${Date.now()}`,
                productId: product.id,
                name: product.name,
                price: product.isPromotion
                  ? product.price * (1 - product.discountPercentage / 100)
                  : product.price,
                quantity: 1,
                image: product.images[0] || "",
                type: "product",
                originalPrice: product.isPromotion ? product.price : undefined,
              },
            ],
          });
        }
      },

      addPack: (pack: Pack) => {
        const { items } = get();
        const existing = items.find(
          (i) => i.packId === pack.id && i.type === "pack"
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: `cart-pack-${pack.id}-${Date.now()}`,
                productId: pack.id,
                name: pack.name,
                price: pack.packPrice,
                quantity: 1,
                image: pack.image,
                type: "pack",
                packId: pack.id,
                isPack: true,
                originalPrice: pack.originalTotalPrice,
              },
            ],
          });
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "valala-cart" }
  )
);
