import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-orange-100/60",
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <Skeleton className="mb-4 aspect-square w-full rounded-xl" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="mb-2 h-3 w-full" />
      <Skeleton className="h-5 w-1/3" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl">
      <Skeleton className="h-[300px] w-full sm:h-[450px]" />
    </div>
  );
}
