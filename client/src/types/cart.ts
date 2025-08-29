
export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  available: boolean;
  handle?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  features: string[];
  badge?: string;
  popular?: boolean;
  rating?: number;
  reviews?: number;
  description?: string;
  shopifyUrl?: string;
  variantId?: string;
  available?: boolean;
}

export interface CheckoutData {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  country: string;
  zip: string;
  phone: string;
}
