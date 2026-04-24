import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import { CATEGORIES, CURRENCY } from "@/config";
import type { ProductFilters, SortOption } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

export default function ProductsPage() {
  const { products, loading, loadProducts } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get("category") || null,
    minPrice: null,
    maxPrice: null,
    promotionOnly: searchParams.get("promotion") === "true",
    sort: "newest",
  });

  useEffect(() => {
    if (products.length === 0) loadProducts();
  }, [loadProducts, products.length]);

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.promotionOnly) params.set("promotion", "true");
    setSearchParams(params, { replace: true });
  }, [filters.category, filters.promotionOnly, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.promotionOnly) {
      result = result.filter((p) => p.isPromotion);
    }
    if (filters.minPrice !== null) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== null) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    // Sort
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => {
          const aP = a.isPromotion ? a.price * (1 - a.discountPercentage / 100) : a.price;
          const bP = b.isPromotion ? b.price * (1 - b.discountPercentage / 100) : b.price;
          return aP - bP;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          const aP = a.isPromotion ? a.price * (1 - a.discountPercentage / 100) : a.price;
          const bP = b.isPromotion ? b.price * (1 - b.discountPercentage / 100) : b.price;
          return bP - aP;
        });
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [products, filters]);

  const clearFilters = () => {
    setFilters({
      category: null,
      minPrice: null,
      maxPrice: null,
      promotionOnly: false,
      sort: "newest",
    });
  };

  const hasActiveFilters =
    filters.category || filters.promotionOnly || filters.minPrice !== null || filters.maxPrice !== null;

  return (
    <div className="pb-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tous les produits</h1>
        <p className="mt-1 text-sm text-gray-500">
          {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Filters sidebar */}
        <aside className="space-y-6 rounded-2xl border border-orange-100 bg-white p-5 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Filtres</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-medium text-orange-500 hover:text-orange-700"
              >
                Réinitialiser
              </button>
            )}
          </div>

          {/* Category filter */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-600">Catégorie</h4>
            <div className="space-y-1">
              <button
                onClick={() => setFilters((f) => ({ ...f, category: null }))}
                className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                  !filters.category ? "bg-orange-100 font-medium text-orange-700" : "text-gray-600 hover:bg-orange-50"
                }`}
              >
                Toutes
              </button>
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setFilters((f) => ({ ...f, category: cat.id }))
                    }
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                      filters.category === cat.id
                        ? "bg-orange-100 font-medium text-orange-700"
                        : "text-gray-600 hover:bg-orange-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-600">Prix ({CURRENCY})</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice ?? ""}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, minPrice: e.target.value ? Number(e.target.value) : null }))
                }
                className="w-full rounded-lg border border-orange-200 px-3 py-1.5 text-sm outline-none focus:border-orange-400"
              />
              <span className="text-gray-400">—</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice ?? ""}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, maxPrice: e.target.value ? Number(e.target.value) : null }))
                }
                className="w-full rounded-lg border border-orange-200 px-3 py-1.5 text-sm outline-none focus:border-orange-400"
              />
            </div>
          </div>

          {/* Promotion toggle */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={filters.promotionOnly}
              onChange={(e) =>
                setFilters((f) => ({ ...f, promotionOnly: e.target.checked }))
              }
              className="h-4 w-4 rounded border-orange-300 text-orange-500 focus:ring-orange-400"
            />
            <span className="text-sm font-medium text-gray-700">En promotion uniquement</span>
          </label>
        </aside>

        {/* Products area */}
        <div>
          {/* Sort */}
          <div className="mb-4 flex items-center justify-end gap-2">
            <span className="text-sm text-gray-500">Trier :</span>
            {(
              [
                { value: "newest", label: "Nouveautés" },
                { value: "price-asc", label: "Prix ↑" },
                { value: "price-desc", label: "Prix ↓" },
              ] as { value: SortOption; label: string }[]
            ).map((opt) => (
              <Button
                key={opt.value}
                size="sm"
                variant={filters.sort === opt.value ? "primary" : "ghost"}
                onClick={() => setFilters((f) => ({ ...f, sort: opt.value }))}
              >
                {opt.label}
              </Button>
            ))}
          </div>

          <ProductGrid products={filteredProducts} loading={loading} />
        </div>
      </div>
    </div>
  );
}
