import React, { useEffect, useState } from "react";
import UserSettings from "@/components/UserSettings";
import ProfileDetailsTab from "@/components/ProfileDetailsTab";
import ChangePasswordTab from "@/components/ChangePasswordTab";
import BusinessInformationTab from "@/components/BusinessInformation";
import UserInformation from "@/components/UserInformation";
import { useAuthUser } from "react-auth-kit";

export interface UserDataType {
  cartId: string | null;
  createdAt: string;
  email: string;
  emailVerificationToken: string;
  isTwoFactorEnabled: boolean;
  isVerfied: boolean;
  name: string;
  password: string;
  profile: string;
  resentPasswordExpires: string | null;
  resentPasswordToken: string | null;
  role: string;
  status: string;
  updatedAt: string;
  userId: string;
  wishlistId: string | null;
}

const User: React.FC = () => {
  const getUser = useAuthUser();
  const authUser = getUser();


  const userData: UserDataType | null = authUser
    ? {
        cartId: null,
        createdAt: new Date().toISOString(),
        email: authUser.email || "",
        emailVerificationToken: "",
        isTwoFactorEnabled: authUser.isTwoFactorEnabled ?? false,
        isVerfied: authUser.isVerfied ?? false,
        name: authUser.name || "",
        password: "",
        profile: authUser.profile || "/default-profile.png",
        resentPasswordExpires: null,
        resentPasswordToken: null,
        role: authUser.role || "buyer",
        status: "active",
        updatedAt: new Date().toISOString(),
        userId: authUser.userId || "",
        wishlistId: null,
      }
    : null;

  const [user, setUser] = useState<UserDataType | null>(userData);

  useEffect(() => {
    setUser(userData);
  }, [authUser]);

  if (!user) return <p>Loading user data...</p>;

  return (
    <main className="flex flex-col px-3 md:px-7 pb-3">
      <UserInformation user={user} />
      <UserSettings className="sm:px-4">
        <ProfileDetailsTab
          user={user}
          setUser={setUser}
          label="profiledetails"
          tabName="Profile Details"
        />
        <ChangePasswordTab user={user} label="changepassword" tabName="Change Password" />
        {user.role === "seller" && (
          <BusinessInformationTab
            label="bussininfo"
            tabName="Business Information"
          />
        )}
      </UserSettings>
    </main>
  );
};

export default User;
