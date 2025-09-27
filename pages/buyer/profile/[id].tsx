"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/homePage/Header";
import Footer from "@/components/homePage/Footer";
import UserInformation from "@/components/UserInformation";
import ProfileDetailsTab from "@/components/ProfileDetailsTab";
import ChangePasswordTab from "@/components/ChangePasswordTab";
import OrderComponent from "@/components/Orders";
import { getUserFromToken } from "@/utils/auth";
import { UserDataType } from "@/components/pages/UserPage";
import ProtectedRoute from "@/components/auth/ProtectedRoutes";
const BuyerProfilePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  useEffect(() => {
    const fetchUser = async () => {
      const tokenData = getUserFromToken() 
      if (!tokenData) {
        router.replace("/auth/login");
        return;
      }

      if (tokenData.role !== "buyer") {
        router.replace("/404");
        return;
      }

      try {
        const res = await fetch(`https://umurava-challenge-bn.onrender.com/api/getSingleUser${tokenData.userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data: UserDataType = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>No user found.</p>;

  const tabs = [
    { label: "Profile Details", value: "profile" },
    { label: "Change Password", value: "password" },
  ];

  return (
	<ProtectedRoute allowedRoles={["admin"]}>
		 <section className="flex flex-col min-h-screen">
    
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>


      <main className="flex-1 mt-40 pb-24 overflow-auto bg-gray-50">
        <div className="p-6 max-w-4xl mx-auto">

          <UserInformation user={user} />

          
          <div className="mt-6 flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as "profile" | "password")}
                className={`pb-2 font-semibold ${
                  activeTab === tab.value
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-700 font-medium border-b-0"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

       
          <div className="mt-4">
            {activeTab === "profile" ? (
              <ProfileDetailsTab
                setUser={setUser}
                label="Profile Details"
                tabName="profile"
                user={user}
              />
            ) : (
              <ChangePasswordTab
                user={user}
                label="Change Password"
                tabName="password"
              />
            )}
          </div>
        </div>

 
        <OrderComponent />
      </main>

    
      <div className="bottom-0 left-0 w-full z-50">
        <Footer />
      </div>
    </section>
	</ProtectedRoute>
   
  );
};

export default BuyerProfilePage;
