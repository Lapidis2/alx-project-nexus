
import React from "react";
import { useTranslation } from "react-i18next";

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
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subTotal,
  deliveryFeePercentage,
  discountPercentage,
  total,
  cartItems,
  handleDelete,
}) => {
  const { t } = useTranslation();

  return (
    <div className="orderSummary w-[500px] rounded-md hover:shadow-md hover:shadow-black">
      <header className="bg-blue-900 text-white text-center p-3 rounded-t-[5px]">
        {t("ORDER SUMMARY")}
      </header>

      <div className="summaryContent p-5 font-semibold">
        <div className="summaryItems mb-10">
          {cartItems.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}

          {cartItems.map((item) => (
            <div
              className="container m-[10px] flex justify-between items-center p-[5px] px-[15px] h-[57px] bg-white rounded-md text-[9px] font-semibold mx-auto"
              key={item.id}
            >
              <div className="img h-full">
                <img className="h-full" src={item.img} alt={item.name} />
              </div>

              <div className="details w-20 h-[90%] flex flex-col">
                <div className="w-[78px] flex items-center">
                  <div className="w-[53%] text-amber-600">Product:</div>
                  <div className="text-center">{item.name}</div>
                </div>
                <div className="w-[78px] flex items-center">
                  <div className="w-[55%] text-amber-600">Quantity:</div>
                  <div className="text-center">{item.quantity}</div>
                </div>
                <div className="w-[78px] flex items-center">
                  <div className="w-[35%] text-amber-600">Price:</div>
                  <div className="text-center">{item.price} Rwf</div>
                </div>
              </div>

              <div className="action h-full flex flex-col justify-between items-center">
                <button
                  className="w-20 h-[25px] bg-blue-900 text-white rounded-[5px] text-[10px]"
                  onClick={() => handleDelete(item.id)}
                >
                  Remove
                </button>
                <div className="flex w-full my-1">
                  <div className="w-[47%] text-amber-600 text-[9px]">Subtotal:</div>
                  <div className="text-left text-[9px] tracking-tight">
                    {item.quantity * item.price} Rwf
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="summaryTotals-details m-auto w-[90%] pl-[10px]">
          <div className="summaryTotals-item flex items-center my-[10px] text-base p-0 w-[98%]">
            <div className="summarySub w-[70%] my-[5px] text-blue-800">Sub Total</div>
            <span>{subTotal} Rwf</span>
          </div>

          <div className="summaryTotals-item flex items-center my-[10px] text-base p-0 w-[98%]">
            <div className="summarySub w-[70%] my-[5px] text-blue-800">Delivery Fee</div>
            <span>{Math.round((subTotal * deliveryFeePercentage) / 100)} Rwf</span>
          </div>

          <div className="summaryTotals-item flex items-center my-[10px] text-base p-0 w-[98%]">
            <div className="summarySub w-[70%] my-[5px] text-blue-800">Discount</div>
            <span>{Math.round((subTotal * discountPercentage) / 100)} Rwf</span>
          </div>

          <hr className="my-5 border-solid border-[1.5px] border-blue-900" />

          <div className="summaryTotals-item summaryTotal flex items-center my-[10px] text-base p-0 w-[98%]">
            <div className="w-[64%] my-auto mx-[2px] pl-5 text-amber-700 font-semibold">Total</div>
            <span className="text-blue-950">{total} Rwf</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
