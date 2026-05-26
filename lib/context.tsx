"use client";

import { createContext, useContext, useReducer, useState, ReactNode } from "react";
import { Product } from "./data";

// ─── Cart ─────────────────────────────────────────────────────────────────────

export type CartItem = { product: Product; qty: number };
type CartState  = { items: CartItem[] };
type CartAction =
  | { type: "ADD";        product: Product; qty?: number }
  | { type: "REMOVE";     id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find(i => i.product.id === action.product.id);
      if (exists) {
        return { items: state.items.map(i => i.product.id === action.product.id ? { ...i, qty: i.qty + (action.qty ?? 1) } : i) };
      }
      return { items: [...state.items, { product: action.product, qty: action.qty ?? 1 }] };
    }
    case "REMOVE":
      return { items: state.items.filter(i => i.product.id !== action.id) };
    case "UPDATE_QTY":
      if (action.qty <= 0) return { items: state.items.filter(i => i.product.id !== action.id) };
      return { items: state.items.map(i => i.product.id === action.id ? { ...i, qty: action.qty } : i) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export type CartContextType = {
  items:          CartItem[];
  addToCart:      (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty:      (id: string, qty: number) => void;
  clearCart:      () => void;
  total:          number;
  count:          number;
};

const CartCtx = createContext<CartContextType | null>(null);

// ─── Auth ─────────────────────────────────────────────────────────────────────

export type AuthUser = { name: string; email: string } | null;

export type AuthContextType = {
  user:   AuthUser;
  login:  (name: string, email: string) => void;
  logout: () => void;
};

const AuthCtx = createContext<AuthContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProviders({ children }: { children: ReactNode }) {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });
  const [user, setUser] = useState<AuthUser>(null);

  return (
    <AuthCtx.Provider value={{
      user,
      login:  (name, email) => setUser({ name, email }),
      logout: () => setUser(null),
    }}>
      <CartCtx.Provider value={{
        items:          cartState.items,
        addToCart:      (p, q)    => dispatch({ type: "ADD",        product: p, qty: q }),
        removeFromCart: (id)      => dispatch({ type: "REMOVE",     id }),
        updateQty:      (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty }),
        clearCart:      ()        => dispatch({ type: "CLEAR" }),
        total: cartState.items.reduce((s, i) => s + i.product.price * i.qty, 0),
        count: cartState.items.reduce((s, i) => s + i.qty, 0),
      }}>
        {children}
      </CartCtx.Provider>
    </AuthCtx.Provider>
  );
}

export const useCart = (): CartContextType => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside AppProviders");
  return ctx;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside AppProviders");
  return ctx;
};
