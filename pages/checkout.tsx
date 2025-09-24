import React from "react";
import Link from "next/link";
import Head from "next/head";
import OrderSummary from "@/components/checkOut/OrderSummary";
import Payment from "@/components/checkOut/Payment";
import useFetch from "@/components/checkOut/UseFetch";
import Footer from "@/components/homePage/Footer";
import Header from "@/components/homePage/Header";
import { useTranslation } from "react-i18next";

const Checkout: React.FC = () => {
  const { cartItems, setCartItems, subTotal, total, discountPercentage, deliveryFeePercentage } = useFetch("/api/cart");

  const handleDelete = (id: number) => {
    setCartItems((products) => products.filter((item) => item.id !== id));
  };

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("Checkout")} | Nexus</title>
        <meta name="description" content="Securely complete your checkout process on Nexus" />
        <meta name="keywords" content="checkout, ecommerce, payment, cart" />
      </Head>

      <Header />

      <main className="w-[80%] sm:w-[75%] md:w-[70%] mx-auto  mb-20 mt-60">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-start gap-6">
       
          <Payment className="w-full md:w-[60%]" />

    
          <OrderSummary
            className="w-full md:w-[35%]"
            cartItems={cartItems}
            subTotal={subTotal}
            deliveryFeePercentage={deliveryFeePercentage}
            discountPercentage={discountPercentage}
            total={total}
            handleDelete={handleDelete}
          />
        </div>

     
        <div className="flex justify-center mt-10">
		<Link href="/products" passHref>
  <button className="bg-amber-600 px-10 py-3 rounded-lg text-lg text-white font-semibold hover:shadow-sm hover:shadow-black">
    {t("BACK TO HOME")}
  </button>
</Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Checkout;
