import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
interface Product {
  id: number;
  img: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  subTotal: number;
  deliveryFeePercentage: number;
  discountPercentage: number;
  total: number;
  cartItems: Product[];
  handleDelete: (id: number) => void;
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subTotal,
  deliveryFeePercentage,
  discountPercentage,
  total,
  cartItems,
  handleDelete,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`rounded-md hover:shadow-md hover:shadow-black p-4 bg-white ${className}`}>
      <header className="bg-blue-900 text-white text-center p-3 rounded-t-[5px]">
        {t("ORDER SUMMARY")}
      </header>

      <div className="summaryContent mt-4">
        {cartItems.length === 0 && <p className="text-center text-gray-500">{t("Your cart is empty")}</p>}

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 rounded-md p-3 my-2 gap-3"
          >
            <div className="img h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0">
              <Image className="h-full w-full object-cover rounded-md" src={item.img} alt={item.name} />
            </div>

            <div className="details flex-1 flex flex-col justify-center text-xs sm:text-sm">
              <p>
                <span className="text-amber-600">{t("Product")}: </span>
                {item.name}
              </p>
              <p>
                <span className="text-amber-600">{t("Quantity")}: </span>
                {item.quantity}
              </p>
              <p>
                <span className="text-amber-600">{t("Price")}: </span>
                {item.price} Rwf
              </p>
            </div>

            <div className="action flex flex-col items-end gap-1">
              <button
                className="bg-blue-900 text-white px-3 py-1 rounded text-xs"
                onClick={() => handleDelete(item.id)}
              >
                {t("Remove")}
              </button>
              <p className="text-right text-xs">
                {t("Subtotal")}: {item.quantity * item.price} Rwf
              </p>
            </div>
          </div>
        ))}

        {/* Totals */}
        <div className="summaryTotals mt-4 border-t pt-4 text-sm">
          <div className="flex justify-between my-1">
            <span className="text-blue-800">{t("Sub Total")}:</span>
            <span>{subTotal} Rwf</span>
          </div>
          <div className="flex justify-between my-1">
            <span className="text-blue-800">{t("Delivery Fee")}:</span>
            <span>{Math.round((subTotal * deliveryFeePercentage) / 100)} Rwf</span>
          </div>
          <div className="flex justify-between my-1">
            <span className="text-blue-800">{t("Discount")}:</span>
            <span>{Math.round((subTotal * discountPercentage) / 100)} Rwf</span>
          </div>
          <hr className="my-2 border-blue-900" />
          <div className="flex justify-between font-semibold text-amber-700">
            <span>{t("Total")}:</span>
            <span>{total} Rwf</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
