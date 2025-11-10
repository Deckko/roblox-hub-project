"use client";

import { useCart, CartItem } from "./CartContext";

export default function ProductCard({ product }: { product: CartItem }) {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded shadow m-2">
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p>{product.price} Robux</p>
      <button
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
