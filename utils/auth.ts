
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  userId: string;
  role: "admin" | "seller" | "buyer";
  exp: number;
}

export const getUserFromToken = (): JwtPayload | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded; 
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
