
interface CustomerData {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  acceptMarketing?: boolean;
  accountType?: "personal" | "company";
  companyName?: string;
  industry?: string;
  employeeCount?: string;
  vatNumber?: string;
}

interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  accountType: "personal" | "company";
  companyName?: string;
  isVerified: boolean;
  shopifyCustomerId?: string;
}

class ShopifyAuthService {
  private baseUrl = "/api";
  private currentUser: AuthUser | null = null;

  constructor() {
    // Load user from localStorage on initialization
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    try {
      const userData = localStorage.getItem("deliwer_user");
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    } catch (error) {
      console.error("Failed to load user from storage:", error);
      localStorage.removeItem("deliwer_user");
    }
  }

  private saveUserToStorage(user: AuthUser) {
    try {
      localStorage.setItem("deliwer_user", JSON.stringify(user));
      this.currentUser = user;
    } catch (error) {
      console.error("Failed to save user to storage:", error);
    }
  }

  private clearUserFromStorage() {
    localStorage.removeItem("deliwer_user");
    localStorage.removeItem("deliwer_token");
    this.currentUser = null;
  }

  async signup(userData: CustomerData): Promise<AuthUser> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Signup failed");
      }

      const result = await response.json();
      
      // Create user object
      const user: AuthUser = {
        id: result.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        accountType: userData.accountType || "personal",
        companyName: userData.companyName,
        isVerified: result.isVerified || false,
        shopifyCustomerId: result.shopifyCustomerId,
      };

      this.saveUserToStorage(user);
      
      // Save auth token if provided
      if (result.token) {
        localStorage.setItem("deliwer_token", result.token);
      }

      return user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<AuthUser> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const result = await response.json();
      
      const user: AuthUser = {
        id: result.id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        phone: result.phone,
        accountType: result.accountType || "personal",
        companyName: result.companyName,
        isVerified: result.isVerified || false,
        shopifyCustomerId: result.shopifyCustomerId,
      };

      this.saveUserToStorage(user);
      
      if (result.token) {
        localStorage.setItem("deliwer_token", result.token);
      }

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem("deliwer_token");
      if (token) {
        await fetch(`${this.baseUrl}/auth/logout`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      this.clearUserFromStorage();
    }
  }

  async refreshUser(): Promise<AuthUser | null> {
    try {
      const token = localStorage.getItem("deliwer_token");
      if (!token) return null;

      const response = await fetch(`${this.baseUrl}/auth/me`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        this.clearUserFromStorage();
        return null;
      }

      const result = await response.json();
      const user: AuthUser = {
        id: result.id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
        phone: result.phone,
        accountType: result.accountType || "personal",
        companyName: result.companyName,
        isVerified: result.isVerified || false,
        shopifyCustomerId: result.shopifyCustomerId,
      };

      this.saveUserToStorage(user);
      return user;
    } catch (error) {
      console.error("Refresh user error:", error);
      this.clearUserFromStorage();
      return null;
    }
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && localStorage.getItem("deliwer_token") !== null;
  }

  getAuthToken(): string | null {
    return localStorage.getItem("deliwer_token");
  }

  async createShopifyCustomer(customerData: any): Promise<any> {
    try {
      const response = await fetch("/shopify/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error("Failed to create Shopify customer");
      }

      return await response.json();
    } catch (error) {
      console.error("Shopify customer creation error:", error);
      throw error;
    }
  }
}

export const shopifyAuthService = new ShopifyAuthService();
