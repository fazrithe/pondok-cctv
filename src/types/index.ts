export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  type: string;
  brand: string;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviewCount: number;
  sold: number;
  stock: number;
  badge?: string | null;
  resolution: string;
  connectivity: string;
  placement: string;
  color: string;
  shortDescription: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  images: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  avatarColor: string;
  initials: string;
  comment: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  category: string;
  scene: string;
  date: string;
  cameras: number;
  color: string;
  description: string;
  images: string[];
}

export interface CartItem {
  product: Product;
  qty: number;
}
