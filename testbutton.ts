import { UserDataType } from "@/components/pages/UserPage";

export const handleFakeLogin = () => {
  if (typeof window === "undefined") {
    // If window is not defined, do nothing (probably server-side)
    return;
  }

  const fakeUser: UserDataType = {
    userId: "1",
    name: "Jean Pierre",
    email: "jean@example.com",
    role: "buyer",
    phone: "0785934003",
    profile: "/assets/images/profile.png",
    isTwoFactorEnabled: false,
    cartId: "cart123",
    createdAt: new Date().toISOString(),
    emailVerificationToken: "",
    password: "",
    updatedAt: "",
    wishlistId: "",
    isVerfied: true,
    status: "active",
    resentPasswordExpires: null,
    resentPasswordToken: null,
  };

  localStorage.setItem("token", "fake-token");
  localStorage.setItem("user", JSON.stringify(fakeUser));
  alert("Fake buyer set! Now you can visit /buyer/profile/1");
};
