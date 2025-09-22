import React from "react";
import Head from "next/head";
import OrderSummary from "@/components/checkOut/OrderSummary";
import Payment from "@/components/checkOut/Payment";
import useFetch from "@/components/checkOut/UseFetch";
import Footer from "@/components/homePage/Footer";
import Header from "@/components/homePage/Header";
import { useTranslation } from "react-i18next";

const Checkout: React.FC = () => {
  const {
    cartItems,
    setCartItems,
    subTotal,
    total,
    discountPercentage,
    deliveryFeePercentage,
  } = useFetch("/api/cart"); 

  const handleDelete = (id: number) => {
    setCartItems((products) => products.filter((item) => item.id !== id));
  };

  const { t } = useTranslation();

  return (
    <>
     
      <Head>
        <title>{t("Checkout")} | Nexus</title>
        <meta
          name="description"
          content="Securely complete your checkout process on Nexus"
        />
        <meta name="keywords" content="checkout, ecommerce, payment, cart" />
      </Head>

      <Header />

      <main className="w-[80%] mx-auto mt-60">
        <div className="flex justify-between m-auto">
          <Payment />
          <OrderSummary
            cartItems={cartItems}
            subTotal={subTotal}
            deliveryFeePercentage={deliveryFeePercentage}
            discountPercentage={discountPercentage}
            total={total}
            handleDelete={handleDelete}
          />
        </div>

        <a href="/products">
          <button className="bg-amber-600 px-32 py-3 rounded-lg text-xl mx-[410px] my-20 text-white font-semibold hover:shadow-sm hover:shadow-black">
            {t("BACK TO HOME")}
          </button>
        </a>
      </main>

      <Footer />
    </>
  );
};

export default Checkout;
