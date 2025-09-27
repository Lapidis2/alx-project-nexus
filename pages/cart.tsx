"use client";

import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { fetchCart, updateQuantity, removeItem } from "@/store/cartSlice";

import CartItemList from "@/components/cart/CartItemList";
import CartTotals from "@/components/cart/CartTotals";
import Header from "@/components/homePage/Header";
import Footer from "@/components/homePage/Footer";
import { useTranslation } from "react-i18next";

const deliveryFeePercentage = 5;
const discountPercentage = 10;

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: cartItems, status } = useSelector((state: RootState) => state.cart);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
    try {
      await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
    } catch (err) {
      console.error("Failed to update cart quantity", err);
    }
  };

  const handleDelete = async (productId: string) => {
    dispatch(removeItem(productId));
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });
    } catch (err) {
      console.error("Failed to delete cart item", err);
    }
  };

  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subTotal + (subTotal * deliveryFeePercentage) / 100 - (subTotal * discountPercentage) / 100;

  return (
    <>
      <Head>
        <title>{t("Shopping Cart")} | Nexus</title>
        <meta name="description" content="View and manage your shopping cart" />
      </Head>

      <Header />

      <main className="w-full mx-auto my-[50px] p-4 mt-40 sm:text-sm">
        <h1 className="text-xl font-semibold ml-10">
          {t("Shopping Cart")}{" "}
          <span className="bg-gray-200 py-[4px] px-4 font-bold rounded-lg">{cartItems.length}</span>
        </h1>

        <div className="flex flex-col lg:flex-row pt-11 gap-6">
          <div className="w-full lg:w-2/3">
            <CartItemList
              cartItems={cartItems}
              handleQuantityChange={handleQuantityChange}
              handleDelete={handleDelete}
              isLoading={status === "loading"}
            />
          </div>

          <div className="w-full lg:w-1/3">
            <CartTotals
              subTotal={subTotal}
              deliveryFeePercentage={deliveryFeePercentage}
              discountPercentage={discountPercentage}
              total={total}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Cart;
