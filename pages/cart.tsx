import { useEffect, useState } from "react";
import Head from "next/head";
import CartItemList from "@/components/cart/CartItemList";
import CartTotals from "@/components/cart/CartTotals";
import Footer from "@/components/homePage/Footer";
import Header from "@/components/homePage/Header";
import { useTranslation } from "react-i18next";
import {Product} from "@/interfaces"

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const deliveryFeePercentage = 5;
  const discountPercentage = 10;
  const { t } = useTranslation();

  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/cart", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch cart data");

        const data: Product[] = await res.json();

        const formattedData = data.map(item => ({
          ...item,
          img: item.img || "/placeholder.png",
          quantity: item.quantity || 1,
        }));

        setCartItems(formattedData);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // ✅ Handle quantity change
  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  // ✅ Handle delete
  const handleDelete = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // ✅ Recalculate totals
  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubTotal(subtotal);

    const totalCalc =
      subtotal +
      (subtotal * deliveryFeePercentage) / 100 -
      (subtotal * discountPercentage) / 100;

    setTotal(totalCalc);
  }, [cartItems]);

  return (
    <>
      <Head>
        <title>{t("Shopping Cart")} | Nexus</title>
        <meta name="description" content="View and manage your shopping cart" />
      </Head>

      <Header />
      <main className="w-[90%] mx-auto my-[50px] p-4 mt-60">
        <h1 className="text-xl font-semibold ml-10">
          {t("Shopping Cart")}{" "}
          <span className="bg-gray-200 py-[4px] px-4 font-bold rounded-lg">
            {cartItems.length}
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row pt-11 gap-6">
          <CartItemList
            cartItems={cartItems}
            handleQuantityChange={handleQuantityChange}
            handleDelete={handleDelete}
            isLoading={isLoading}
          />
          <CartTotals
            subTotal={subTotal}
            deliveryFeePercentage={deliveryFeePercentage}
            discountPercentage={discountPercentage}
            total={total}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
