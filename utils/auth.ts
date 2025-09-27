import { jwtDecode } from "jwt-decode";


export interface JwtPayload {
  userId: string;
  role: "admin" | "seller" | "buyer"; 
  exp: number;
}

export const getUserRoleFromToken = (): JwtPayload["role"] | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token); 
	console.log(decoded)
    return decoded.role;
	
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};
