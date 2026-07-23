"use client";

import { createContext, useContext, useEffect, useReducer, ReactNode } from "react";
import type { ApiProduct } from "./api";

export type CartItem = { product: ApiProduct; qty: number };
type CartState  = { items: CartItem[] };
type CartAction =
  | { type: "ADD";        product: ApiProduct; qty?: number }
  | { type: "REMOVE";     id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE";    items: CartItem[] };

const CART_STORAGE_KEY = "petellence-cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
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
  addToCart:      (product: ApiProduct, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty:      (id: string, qty: number) => void;
  clearCart:      () => void;
  total:          number;
  count:          number;
};

const CartCtx = createContext<CartContextType | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (Array.isArray(parsed.items)) dispatch({ type: "HYDRATE", items: parsed.items });
      }
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  }, [cartState]);

  return (
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
  );
}

export const useCart = (): CartContextType => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside AppProviders");
  return ctx;
};
