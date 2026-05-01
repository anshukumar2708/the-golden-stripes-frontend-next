export interface SizeVariant {
  size: string; 
  stock: number;
  sku: string;
  price: number;
  originalPrice: number;
  discount: number;
}

export interface ColorVariant {
  color: string;
  images: string[];
  sizes: SizeVariant[];
}
export interface Product {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  tags: string[];
  brand: string;
  description: string;
  rating: number;
  reviewCount: number;
  variants: ColorVariant[];
  sku: string;
  gtin: string;
  specifications?: Record<string, string>;
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export type SortOption = 'price-asc' | 'price-desc' | 'popularity' | 'newest' | 'rating';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  ratings: number;
  colors: string[];
  sizes: string[];
  discount: number;
}

export type Currency = 'INR' | 'USD' | 'CAD' | 'AUD' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: string;
  rate: number; // relative to USD
  flag: string;
}

export interface Category {
  name: string;
  slug: string;
  icon?: string;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  name: string;
  slug: string;
}
