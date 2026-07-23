// Client-side "quote cart": buyers collect products across pages, then submit
// ONE RFQ for everything. No checkout/payments, the cart feeds the
// /request-a-quote form. localStorage-backed; a custom event keeps every
// mounted badge/count in sync.
"use client";

export type CartItem = { name: string; slug: string };

const KEY = "dgw-quote-cart";
export const CART_EVENT = "dgw-cart-change";

export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as CartItem[];
  } catch {
    return [];
  }
}

function persist(items: CartItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(CART_EVENT, { detail: items.length }));
  } catch {
    // storage unavailable (private mode), cart silently degrades
  }
}

export function addToCart(item: CartItem): CartItem[] {
  const items = getCart();
  if (!items.some((x) => x.slug === item.slug)) items.push(item);
  persist(items);
  return items;
}

export function removeFromCart(slug: string): CartItem[] {
  const items = getCart().filter((x) => x.slug !== slug);
  persist(items);
  return items;
}

export function clearCart() {
  persist([]);
}
