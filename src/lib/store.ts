import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ShopifyProduct } from "./shopify";

interface CartItem extends ShopifyProduct {
  quantity: number;
}

interface AuthUser {
  name: string;
  email: string;
}

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  closeSearch: () => void;
}

interface AuthState {
  user: AuthUser | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

interface CartState extends UIState, AuthState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: ShopifyProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // UI State
      isSidebarOpen: false,
      toggleSidebar: () => set({ isSidebarOpen: !get().isSidebarOpen }),
      closeSidebar: () => set({ isSidebarOpen: false }),
      isSearchOpen: false,
      toggleSearch: () => set({ isSearchOpen: !get().isSearchOpen }),
      closeSearch: () => set({ isSearchOpen: false }),

      // Auth State
      user: null,
      login: (name, email) => set({ user: { name, email } }),
      logout: () => set({ user: null }),

      // Cart State
      items: [],
      isOpen: false,
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      toggleCart: () => set({ isOpen: !get().isOpen }),
      clearCart: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((acc, item) => {
          const price = parseFloat(item.variants.edges[0].node.price.amount);
          return acc + price * item.quantity;
        }, 0),
    }),
    {
      name: "shop-cart-storage",
    }
  )
);
