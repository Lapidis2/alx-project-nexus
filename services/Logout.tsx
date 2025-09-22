"use client";

import { useSignOut } from "react-auth-kit";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const signOut = useSignOut();
  const router = useRouter();

  const logout = () => {
    if (typeof window !== "undefined") {
      signOut(); 
      router.push("/login");
    }
  };

  return logout;
};

export default useLogout;
