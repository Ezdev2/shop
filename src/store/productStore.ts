import { create } from "zustand";
import type { Product, Pack } from "@/types";
import { fetchProducts, fetchPacks } from "@/services/api";

interface ProductState {
  products: Product[];
  packs: Pack[];
  loading: boolean;
  error: string | null;
  loadProducts: () => Promise<void>;
  loadPacks: () => Promise<void>;
  loadAll: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  packs: [],
  loading: false,
  error: null,

  loadProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await fetchProducts();
      set({ products, loading: false });
    } catch {
      set({ error: "Impossible de charger les produits", loading: false });
    }
  },

  loadPacks: async () => {
    set({ loading: true, error: null });
    try {
      const packs = await fetchPacks();
      set({ packs, loading: false });
    } catch {
      set({ error: "Impossible de charger les packs", loading: false });
    }
  },

  loadAll: async () => {
    set({ loading: true, error: null });
    try {
      const [products, packs] = await Promise.all([
        fetchProducts(),
        fetchPacks(),
      ]);
      set({ products, packs, loading: false });
    } catch {
      set({ error: "Impossible de charger les données", loading: false });
    }
  },
}));
