import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "promotion" | "out-of-stock" | "low-stock" | "new" | "pack" | "success" | "warning" | "danger";
  className?: string;
}

export function Badge({ children, variant = "promotion", className }: BadgeProps) {
  const variants = {
    promotion: "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-sm shadow-red-200",
    "out-of-stock": "bg-gray-800 text-white",
    "low-stock": "bg-amber-500 text-white",
    new: "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm shadow-orange-200",
    pack: "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-sm shadow-purple-200",
    success: "bg-emerald-500 text-white",
    warning: "bg-amber-500 text-white",
    danger: "bg-red-500 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
