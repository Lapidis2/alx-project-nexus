"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export function useHandleLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in");
      return;
    }

    setLoading(true); 

    try {
      const res = await fetch("https://umurava-challenge-bn.onrender.com/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("You have been logged out");
        router.replace("/"); 
      } else {
        const data = await res.json();
        alert(data.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false); 
    }
  };

  return { handleLogout, loading };
}
