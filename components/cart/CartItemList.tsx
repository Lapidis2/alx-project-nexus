"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Update quantity
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
      )
    );
  };

  // Remove item
  const handleDelete = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="text-center py-20 text-lg text-gray-700">
        Your cart is empty.
      </div>
    );

  return (
    <div className="px-6 md:px-20 py-10 space-y-6">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-gray-100 rounded-xl p-4 md:p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 relative">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500">{item.price} RWF each</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <button
                className="px-2 py-1"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="px-3">{item.quantity}</span>
              <button
                className="px-2 py-1"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <p className="font-semibold">{item.price * item.quantity} RWF</p>

            <button onClick={() => handleDelete(item.id)} className="text-red-500">
              &#10005;
            </button>
          </div>
        </div>
      ))}

      <div className="text-right font-bold text-xl">
        Total: {totalPrice} RWF
      </div>
    </div>
  );
};

export default Cart;
