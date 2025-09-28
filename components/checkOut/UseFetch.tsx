import { useState, useEffect } from "react";

export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
}

interface RawCartItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  img: string;
}

interface CartResponse {
  email: string;
  items: RawCartItem[];
  updatedAt: string;
  userId: string;
  _id: string;
}

interface UseFetchReturn {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  subTotal: number;
  discountPercentage: number;
  deliveryFeePercentage: number;
  total: number;
}

const useFetch = (url: string): UseFetchReturn => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  useEffect(() => {
	const fetchCart = async () => {
	  try {
		const token = localStorage.getItem("token");
		const res = await fetch(url, {
		  headers: {
			Authorization: `Bearer ${token}`,
		  },
		});
  
	
  
		if (!res.ok) {
		  const errorText = await res.text();
		
		  throw new Error("Failed to fetch cart data");
		}
  
		const data: CartResponse = await res.json();
  
		const parsedData: Product[] = data.items.map((item: RawCartItem) => ({
		  id: Number(item.productId),
		  name: item.name,
		  img: item.img,
		  price: item.price,
		  quantity: Number(item.quantity) || 1,
		}));
  
		setCartItems(parsedData);
	  } catch (error) {
		console.error("Error fetching cart:", error);
	  }
	};
  
	fetchCart();
  }, [url]);
  
  

  const discountPercentage = 5;
  const deliveryFeePercentage = 3;

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = (subTotal * discountPercentage) / 100;
  const deliveryFee = (subTotal * deliveryFeePercentage) / 100;

  const total = subTotal - discount + deliveryFee;

  return {
    cartItems,
    setCartItems,
    subTotal,
    discountPercentage,
    deliveryFeePercentage,
    total,
  };
};

export default useFetch;
