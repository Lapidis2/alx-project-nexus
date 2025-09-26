"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface CartItemListProps {
  cartItems: Product[];
  handleQuantityChange: (id: number, newQuantity: number) => void;
  handleDelete: (id: number) => void;
  isLoading?: boolean;
}

const CartItemList: React.FC<CartItemListProps> = ({
  cartItems,
  handleQuantityChange,
  handleDelete,
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-xlg text-gray-700">
        Your cart is empty.
      </div>
    );
  }

  return (
	<div className="space-y-6 flex-1">
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
			<div className="sm:text-sm">
			  <p className="font-semibold">{item.name}</p>
			  <p className="text-gray-800">{item.price} RWF each</p>
			</div>
		  </div>
  
		  <div className="flex flex-wrap flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between">
			
			
			<div className="flex items-center border rounded-md justify-center w-full sm:w-auto min-w-[120px]">
			  <button
				className="px-2 py-1 disabled:opacity-50"
				onClick={() =>
				  handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
				}
				disabled={item.quantity <= 1}
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
  
			{/* Total price */}
			<p className="font-semibold text-center sm:text-left flex-grow sm:flex-grow-0">
			  {item.price * item.quantity} RWF
			</p>
  
			{/* Delete button */}
			<button
			  onClick={() => handleDelete(item.id)}
			  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition"
			  aria-label={`Delete ${item.name}`}
			>
			  <FontAwesomeIcon icon={faTrash} size="lg" />
			</button>
		  </div>
		</div>
	  ))}
	</div>
  );
  
};

export default CartItemList;
