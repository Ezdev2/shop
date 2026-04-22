import {
  Sparkles,
  Palette,
  Droplets,
  Scissors,
  Flower2,
  type LucideIcon,
} from "lucide-react";

export const BRAND = {
  name: "Valala Cosmetic",
  tagline: "Révélez votre éclat naturel",
  description: "Premium cosmetics for the modern woman",
} as const;

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const CATEGORIES: {
  id: string;
  name: string;
  icon: LucideIcon;
}[] = [
  { id: "skincare", name: "Soins Visage", icon: Sparkles },
  { id: "makeup", name: "Maquillage", icon: Palette },
  { id: "body", name: "Soins Corps", icon: Droplets },
  { id: "hair", name: "Cheveux", icon: Scissors },
  { id: "perfume", name: "Parfums", icon: Flower2 },
] as const;

export const CURRENCY = "€";
