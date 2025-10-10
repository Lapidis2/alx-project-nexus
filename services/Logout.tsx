"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export function useHandleLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("You are not logged in", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://umurava-challenge-bn.onrender.com/api/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.info("You have been logged out", {
          position: "top-center",
          autoClose: 3000,
        });
        router.replace("/");
      } else {
        const data = await res.json();
        toast.error(data.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading };
}
