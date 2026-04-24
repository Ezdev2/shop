import { Link } from "react-router-dom";
import { BRAND } from "@/config";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Percent } from "lucide-react";

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Orange overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/85 via-orange-400/75 to-amber-400/80" />

      {/* Decorative shapes */}
      <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-white/8" />
      <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-white/8" />
      <div className="absolute right-1/3 top-1/4 h-3 w-3 rounded-full bg-white/25" />
      <div className="absolute bottom-1/4 left-1/3 h-4 w-4 rounded-full bg-white/15" />
      <div className="absolute right-1/4 bottom-1/3 h-2 w-2 rounded-full bg-white/30" />

      <div className="relative flex flex-col items-center px-6 py-20 text-center sm:px-12 sm:py-28">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          Nouvelle collection printemps 2026
        </span>
        <h1 className="mb-5 max-w-2xl text-3xl font-bold leading-tight text-white drop-shadow-sm sm:text-5xl sm:leading-tight">
          {BRAND.tagline}
        </h1>
        <p className="mb-9 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
          Découvrez notre gamme de cosmétiques naturels, conçus pour sublimer
          votre beauté au quotidien.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/products">
            <Button
              size="lg"
              className="bg-white !text-orange-600 hover:bg-orange-50 shadow-xl shadow-black/10"
            >
              Découvrir nos produits
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/products?promotion=true">
            <Button
              size="lg"
              variant="ghost"
              className="!text-white hover:bg-white/10 border border-white/20"
            >
              <Percent className="h-4 w-4" />
              Voir les promotions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
