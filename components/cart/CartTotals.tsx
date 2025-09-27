import React from "react";
import Link from "next/link";

interface CartTotalsProps {
  subTotal: number;
  deliveryFeePercentage: number;
  discountPercentage: number;
  total: number;
}

const CartTotals: React.FC<CartTotalsProps> = ({
  subTotal,
  deliveryFeePercentage,
  discountPercentage,
  total,
}) => {
  const deliveryFee = (subTotal * deliveryFeePercentage) / 100;
  const discount = (subTotal * discountPercentage) / 100;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US").format(value);

  return (
    <div className="w-full lg:w-[300px] bg-gray-100 rounded-xl p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Cart Summary</h2>

      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>{formatPrice(subTotal)} RWF</span>
      </div>

      <div className="flex justify-between">
        <span>Delivery Fee ({deliveryFeePercentage}%):</span>
        <span>{formatPrice(deliveryFee)} RWF</span>
      </div>

      <div className="flex justify-between">
        <span>Discount ({discountPercentage}%):</span>
        <span>-{formatPrice(discount)} RWF</span>
      </div>

      <div className="flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>{formatPrice(total)} RWF</span>
      </div>

      <Link href="/checkout">
        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-gray-800">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default CartTotals;
