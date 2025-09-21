"use client";

import React, { useMemo } from "react";
import Link from "next/link";

interface CartTotalsProps {
  subTotal: number;
  deliveryFeePercentage: number; 
  discountPercentage: number;  
}

const CartTotals: React.FC<CartTotalsProps> = ({
  subTotal,
  deliveryFeePercentage,
  discountPercentage,
}) => {

  const { deliveryFee, discount, total } = useMemo(() => {
    const deliveryFee = (subTotal * deliveryFeePercentage) / 100;
    const discount = (subTotal * discountPercentage) / 100;
    const total = subTotal + deliveryFee - discount;
    return { deliveryFee, discount, total };
  }, [subTotal, deliveryFeePercentage, discountPercentage]);

  return (
    <div className="bg-white p-5 rounded-lg w-80 font-sans shadow-md hover:shadow-lg transition-shadow h-[385px]">
      <h2 className="mb-12 text-xl font-semibold">Cart Totals</h2>

      <div className="space-y-3">
        <div className="flex justify-between text-base text-gray-600">
          <span>Sub Total</span>
          <span>{subTotal.toLocaleString()} RWF</span>
        </div>

        <div className="flex justify-between text-base text-gray-600">
          <span>Delivery Fee</span>
          <span>{deliveryFee.toLocaleString()} RWF</span>
        </div>

        <div className="flex justify-between text-base text-gray-600">
          <span>Discount</span>
          <span>-{discount.toLocaleString()} RWF</span>
        </div>

        <div className="flex justify-between text-lg font-semibold border-t pt-4">
          <span>Total</span>
          <span>{total.toLocaleString()} RWF</span>
        </div>
      </div>

      <Link href="/checkout" className="block mt-8">
        <button className="w-full bg-[#203b57] text-white py-3 rounded-md cursor-pointer hover:bg-[#004494] transition-colors">
          Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartTotals;
