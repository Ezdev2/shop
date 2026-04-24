import type { Pack } from "@/types";
import { PackCard } from "@/components/pack/PackCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

interface PacksPreviewProps {
  packs: Pack[];
  loading?: boolean;
}

export function PacksPreview({ packs, loading }: PacksPreviewProps) {
  if (loading) {
    return (
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Packs & Coffrets</h2>
          <p className="text-sm text-gray-500">Nos meilleures offres groupées</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (packs.length === 0) return null;

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Packs & Coffrets</h2>
        <p className="text-sm text-gray-500">Nos meilleures offres groupées</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {packs.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </section>
  );
}
