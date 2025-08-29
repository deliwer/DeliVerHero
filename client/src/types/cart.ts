
export interface CartItem {
  id: string;
  variantId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
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
