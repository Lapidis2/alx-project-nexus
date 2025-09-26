import React, { useState } from "react";
import WeeklyReport from "@/components/dashboard/analytics/WeeklyReports";
import InteractionCard from "@/components/dashboard/InteractiveCard";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  quantitySold: number;
}

interface Review {
  id: string;
  customerName: string;
  productName: string;
  rating: number;
  status: "approved" | "pending";
}

interface Order {
  id: string;
  productId: string;
  status: "delivered" | "pending";
}

const SellerDashboard: React.FC = () => {
  const [products] = useState<Product[]>([
    { id: "p1", name: "Rolex Watch", imageUrl: "/images/rolex.jpg", quantitySold: 20 },
    { id: "p2", name: "Apple iPhone", imageUrl: "/images/iphone.jpg", quantitySold: 30 },
  ]);

  const [reviews] = useState<Review[]>([
    { id: "r1", customerName: "Niyigena Eric", productName: "Rolex Watch", rating: 4, status: "approved" },
    { id: "r2", customerName: "Shema Aime", productName: "Rolex Watch", rating: 5, status: "approved" },
    { id: "r3", customerName: "Mushi Jean", productName: "Rolex Watch", rating: 4, status: "approved" },
  ]);

  const [orders] = useState<Order[]>([
    { id: "o1", productId: "p1", status: "delivered" },
    { id: "o2", productId: "p2", status: "delivered" },
  ]);


  const approvedReviews = reviews.filter(r => r.status === "approved").length;
  const totalPurchasedProducts = products.reduce((acc, p) => acc + p.quantitySold, 0);
  const totalOrders = orders.length;
  const transactions = orders.filter(o => o.status === "delivered").length;

  const cardData = [
    { name: "Reviews", numbers: approvedReviews, icon: <svg width="20" height="20" /> },
    { name: "Purchases", numbers: totalPurchasedProducts, icon: <svg width="20" height="20" /> },
    { name: "Orders", numbers: totalOrders, icon: <svg width="20" height="20" /> },
    { name: "Transactions", numbers: transactions, icon: <svg width="20" height="21" /> },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen space-y-6 px-4 lg:px-6 xl:px-8 py-6 pt-20 ">
   <div className="w-full">
   <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {cardData.map((card, idx) => (
          <InteractionCard key={idx} data={card} />
        ))}
      </div>
   </div>
    


   <div className="w-full h-60 md:h-80 xl:h-96 2xl:h-[500px]">
    <WeeklyReport />
  </div>

      {/* Reviews & Purchases */}
      <div className="flex flex-col lg:flex-row w-full gap-5">
        {/* Reviews */}
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Reviews</h2>
            <span className="text-sm text-orange-500 cursor-pointer">View all</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-left">Review</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="p-2">{r.customerName}</td>
                  <td className="p-2">{r.productName}</td>
                  <td className="p-2">{"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Purchases */}
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Recent Purchases</h2>
            <span className="text-sm text-orange-500 cursor-pointer">View all</span>
          </div>
          <ul>
            {products.map(p => (
              <li key={p.id} className="flex justify-between items-center border-b py-2">
                <div className="flex items-center gap-2">
                  <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-cover rounded" />
                  <span>{p.name}</span>
                </div>
                <span className="text-sm text-blue-500 cursor-pointer">Details</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
