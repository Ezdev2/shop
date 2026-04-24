export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  isPromotion: boolean;
  discountPercentage: number;
  createdAt: string;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  includedProducts: PackProduct[];
  packPrice: number;
  originalTotalPrice: number;
  discount: number;
  image: string;
}

export interface PackProduct {
  productId: string;
  productName: string;
  quantity: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: "product" | "pack";
  packId?: string;
  isPack?: boolean;
  originalPrice?: number;
}

export interface OrderFormData {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: OrderFormData;
  createdAt: string;
  status?: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
}

export interface AdminStats {
  totalProducts: number;
  totalPacks: number;
  totalOrders: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export type SortOption = "newest" | "price-asc" | "price-desc";

export interface ProductFilters {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  promotionOnly: boolean;
  sort: SortOption;
}
