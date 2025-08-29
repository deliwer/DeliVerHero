
import { CartItem } from "@/types/cart";

class ShopifyCartService {
  private cartItems: CartItem[] = [];
  private cartId: string | null = null;

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    try {
      const cartData = localStorage.getItem("deliwer_cart");
      if (cartData) {
        const parsed = JSON.parse(cartData);
        this.cartItems = parsed.items || [];
        this.cartId = parsed.cartId || null;
      }
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
      this.clearCart();
    }
  }

  private saveCartToStorage() {
    try {
      localStorage.setItem("deliwer_cart", JSON.stringify({
        items: this.cartItems,
        cartId: this.cartId,
        updatedAt: new Date().toISOString()
      }));
    } catch (error) {
      console.error("Failed to save cart to storage:", error);
    }
  }

  async addToCart(product: {
    id: string;
    variantId: string;
    title: string;
    variant?: string;
    price: number;
    image: string;
    quantity?: number;
  }): Promise<void> {
    const existingItem = this.cartItems.find(item => item.variantId === product.variantId);
    
    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      const newItem: CartItem = {
        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        variantId: product.variantId,
        productId: product.id,
        title: product.title,
        variant: product.variant || "Default",
        price: product.price,
        quantity: product.quantity || 1,
        image: product.image,
        available: true,
      };
      this.cartItems.push(newItem);
    }

    this.saveCartToStorage();
    
    // Sync with Shopify if user is authenticated
    await this.syncWithShopify();
  }

  async updateCartItem(itemId: string, quantity: number): Promise<void> {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.saveCartToStorage();
      await this.syncWithShopify();
    }
  }

  async removeCartItem(itemId: string): Promise<void> {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.saveCartToStorage();
    await this.syncWithShopify();
  }

  async getCartItems(): Promise<CartItem[]> {
    // Check product availability
    await this.checkAvailability();
    return this.cartItems;
  }

  getCartCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  async clearCart(): Promise<void> {
    this.cartItems = [];
    this.cartId = null;
    this.saveCartToStorage();
  }


  async createCheckout(items: CartItem[]): Promise<string> {
    try {
      const lineItems = items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
      }));

      const response = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineItems,
          customAttributes: [
            {
              key: "source",
              value: "deliwer_metaverse"
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout");
      }

      const { checkoutUrl } = await response.json();
      return checkoutUrl;
    } catch (error) {
      console.error("Checkout creation error:", error);
      throw new Error("Failed to create checkout session");
    }
  }

  private async syncWithShopify(): Promise<void> {
    try {
      // Only sync if we have items and user is authenticated
      const token = localStorage.getItem("deliwer_token");
      if (!token || this.cartItems.length === 0) return;

      const response = await fetch("/shopify/cart/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartId: this.cartId,
          items: this.cartItems.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity
          }))
        }),
      });

      if (response.ok) {
        const { cartId } = await response.json();
        this.cartId = cartId;
        this.saveCartToStorage();
      }
    } catch (error) {
      console.error("Cart sync error:", error);
      // Don't throw - cart should work offline
    }
  }

  private async checkAvailability(): Promise<void> {
    try {
      if (this.cartItems.length === 0) return;

      const variantIds = this.cartItems.map(item => item.variantId);
      const response = await fetch("/shopify/variants/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ variantIds }),
      });

      if (response.ok) {
        const availability = await response.json();
        this.cartItems.forEach(item => {
          const variant = availability[item.variantId];
          item.available = variant?.available || false;
        });
        this.saveCartToStorage();
      }
    } catch (error) {
      console.error("Availability check error:", error);
      // Don't update availability on error
    }
  }
}

export const shopifyCartService = new ShopifyCartService();
