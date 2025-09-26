"use client";

import { useRouter } from "next/navigation"; 
export function useHandleLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in");
      return;
    }

    try {
      const res = await fetch("https://umurava-challenge-bn.onrender.com/api/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("You have been logged out");
        router.push("/"); 
      } else {
        const data = await res.json();
        alert(data.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Something went wrong");
    }
  };

  return handleLogout;
}
