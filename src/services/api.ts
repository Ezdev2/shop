import axios from "axios";
import { API_BASE_URL } from "@/config";
import type { Product, Pack, Order, OrderFormData, CartItem } from "@/types";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// --- Mock data (used when backend is unavailable) ---

const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Sérum Éclat Vitaminé",
    description: "Un sérum léger enrichi en vitamine C pour illuminer votre teint et réduire les taches pigmentaires.",
    price: 34.90,
    stock: 15,
    category: "skincare",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop"],
    isPromotion: false,
    discountPercentage: 0,
    createdAt: "2025-12-01T00:00:00Z",
  },
  {
    id: "p2",
    name: "Crème Hydratante Riche",
    description: "Crème hydratante intense au beurre de karité pour une peau douce et nourrie toute la journée.",
    price: 28.50,
    stock: 30,
    category: "skincare",
    images: ["https://images.unsplash.com/photo-1570194065650-d99fb4ee8e39?w=400&h=400&fit=crop"],
    isPromotion: true,
    discountPercentage: 20,
    createdAt: "2025-11-15T00:00:00Z",
  },
  {
    id: "p3",
    name: "Rouge à Lèvres Velours",
    description: "Rouge à lèvres longue tenue, fini mat velours. Disponible en 12 teintes somptueuses.",
    price: 19.90,
    stock: 50,
    category: "makeup",
    images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop"],
    isPromotion: false,
    discountPercentage: 0,
    createdAt: "2026-01-10T00:00:00Z",
  },
  {
    id: "p4",
    name: "Fond de Teint Fluide",
    description: "Fond de teint couvrance modulable, fini naturel. SPF 15 intégré.",
    price: 32.00,
    stock: 25,
    category: "makeup",
    images: ["https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop"],
    isPromotion: true,
    discountPercentage: 15,
    createdAt: "2025-10-20T00:00:00Z",
  },
  {
    id: "p5",
    name: "Lait Corps Parfumé",
    description: "Lait corporel à la rose et au jasmin pour une peau satinée et délicatement parfumée.",
    price: 24.90,
    stock: 40,
    category: "body",
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop"],
    isPromotion: false,
    discountPercentage: 0,
    createdAt: "2025-12-20T00:00:00Z",
  },
  {
    id: "p6",
    name: "Masque Cheveux Réparateur",
    description: "Masque capillaire à l'huile d'argan pour cheveux secs et abîmés. Résultat visible dès la première utilisation.",
    price: 18.90,
    stock: 8,
    category: "hair",
    images: ["https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop"],
    isPromotion: true,
    discountPercentage: 30,
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "p7",
    name: "Eau de Parfum Fleur d'Oranger",
    description: "Fragrance solaire aux notes de fleur d'oranger, bergamote et musc blanc.",
    price: 59.90,
    stock: 20,
    category: "perfume",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop"],
    isPromotion: false,
    discountPercentage: 0,
    createdAt: "2026-01-05T00:00:00Z",
  },
  {
    id: "p8",
    name: "Gel Nettoyant Douceur",
    description: "Gel nettoyant sans savon qui élimine les impuretés sans agresser la peau.",
    price: 22.50,
    stock: 0,
    category: "skincare",
    images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop"],
    isPromotion: false,
    discountPercentage: 0,
    createdAt: "2025-09-10T00:00:00Z",
  },
  {
    id: "p9",
    name: "Palette Ombres à Paupières",
    description: "Palette de 12 fards à paupières, finis mats et irisés pour des looks infinis.",
    price: 45.00,
    stock: 3,
    category: "makeup",
    images: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop"],
    isPromotion: true,
    discountPercentage: 25,
    createdAt: "2025-11-25T00:00:00Z",
  },
  {
    id: "p10",
    name: "Contour des Yeux Anti-Âge",
    description: "Soin contour des yeux à l'acide hyaluronique pour lisser rides et ridules.",
    price: 39.90,
    stock: 12,
    category: "skincare",
    images: ["https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop"],
    isPromotion: false,
    discountPercentage: 0,
    createdAt: "2026-02-15T00:00:00Z",
  },
];

const MOCK_PACKS: Pack[] = [
  {
    id: "pack1",
    name: "Routine Éclat Quotidien",
    description: "Le trio essentiel pour une peau rayonnante : sérum, crème et nettoyant.",
    includedProducts: [
      { productId: "p1", productName: "Sérum Éclat Vitaminé", quantity: 1 },
      { productId: "p2", productName: "Crème Hydratante Riche", quantity: 1 },
      { productId: "p8", productName: "Gel Nettoyant Douceur", quantity: 1 },
    ],
    packPrice: 68.90,
    originalTotalPrice: 85.90,
    discount: 20,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
  },
  {
    id: "pack2",
    name: "Coffret Maquillage Glam",
    description: "Tout pour un maquillage complet : teint, lèvres et regard sublimés.",
    includedProducts: [
      { productId: "p3", productName: "Rouge à Lèvres Velours", quantity: 1 },
      { productId: "p4", productName: "Fond de Teint Fluide", quantity: 1 },
      { productId: "p9", productName: "Palette Ombres à Paupières", quantity: 1 },
    ],
    packPrice: 79.90,
    originalTotalPrice: 96.90,
    discount: 18,
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&h=400&fit=crop",
  },
  {
    id: "pack3",
    name: "Rituel Bien-Être",
    description: "Offrez-vous une pause douceur avec ce duo corps et cheveux.",
    includedProducts: [
      { productId: "p5", productName: "Lait Corps Parfumé", quantity: 1 },
      { productId: "p6", productName: "Masque Cheveux Réparateur", quantity: 1 },
    ],
    packPrice: 34.90,
    originalTotalPrice: 43.80,
    discount: 20,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
  },
];

// --- API Functions ---

export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data } = await api.get<Product[]>("/products");
    return data;
  } catch {
    console.warn("Backend unavailable — using mock products");
    return MOCK_PRODUCTS;
  }
}

export async function fetchPacks(): Promise<Pack[]> {
  try {
    const { data } = await api.get<Pack[]>("/packs");
    return data;
  } catch {
    console.warn("Backend unavailable — using mock packs");
    return MOCK_PACKS;
  }
}

export async function submitOrder(
  items: CartItem[],
  customer: OrderFormData
): Promise<Order> {
  try {
    const { data } = await api.post<Order>("/orders", { items, customer });
    return data;
  } catch {
    console.warn("Backend unavailable — simulating order submission");
    await new Promise((r) => setTimeout(r, 800));
    return {
      id: `ORD-${Date.now()}`,
      items,
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      customer,
      createdAt: new Date().toISOString(),
    };
  }
}
