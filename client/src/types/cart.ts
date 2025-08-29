
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
