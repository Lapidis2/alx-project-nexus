import React, { useEffect, useState } from "react";
import UserInformation from "@/components/UserInformation";
import { UserDataType } from "@/components/pages/UserPage";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/homePage/Header";
import Footer from "@/components/homePage/Footer";
import ProfileDetailsTab from "@/components/ProfileDetailsTab";
import ChangePasswordTab from "@/components/ChangePasswordTab";
import BusinessInformationTab from "@/components/BusinessInformation";
const SellerProfilePage: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  const userId = params?.id || params?.userId;
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"profile" | "password"|"business">("profile");

  useEffect(() => {
	if (!userId) return;

	const fetchUser = async () => {
	  try {
		const token = localStorage.getItem("token");
		if (!token) {
		  router.push("/auth/login");
		  return;
		}

		const res = await fetch(`/api/users/${userId}`, {
		  headers: { Authorization: `Bearer ${token}` },
		});

		if (!res.ok) throw new Error("Failed to fetch user");

		const data: UserDataType = await res.json();
		if (data.role !== "seller") {
			router.push("/404"); 
			return;
		  }
		setUser(data);
	  } catch (err) {
		console.error(err);
	  } finally {
		setLoading(false);
	  }
	};

	fetchUser();
  }, [userId, router]);

  if (!userId) return <p>Loading user ID...</p>;
  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>No user found.</p>;
  const tabs = [
	{ label: "Profile Details", value: "profile" },
	{ label: "Change Password", value: "password" },
	{ label: "Business Information", value: "business" },
  ];
  return (
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
	  onClick={() => setActiveTab(tab.value as "profile" | "password"|"business")}
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
  ) : activeTab === "password" ? (
    <ChangePasswordTab
      user={user}
      label="Change Password"
      tabName="password"
    />
  ) : (
    <BusinessInformationTab
      user={user}
      label="Business Information"
      tabName="business"
    />
  )}
</div>

	  

	 
		</div>
	  </main>

	  <div className="bottom-0 left-0 w-full z-50">
		<Footer />
	  </div>
	</section>
  );
};

export default SellerProfilePage;
