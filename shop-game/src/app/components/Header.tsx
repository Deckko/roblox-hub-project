"use client";

import { useCart } from "./CartContext";

export default function Header() {
  const { cart, total } = useCart();

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Roblox Shop</h1>
      <div>
        <span>Cart: {cart.length} items</span> | <span>Total: {total} Robux</span>
      </div>
    </header>
  );
}
