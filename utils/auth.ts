import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  userId: string;
  role: "admin" | "seller" | "buyer";
  exp: number;
}

export const getUserFromToken = (
  req?: { headers: { authorization?: string } }
): JwtPayload | null => {
  try {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : req?.headers?.authorization?.split(" ")[1] ?? null;

    if (!token) return null;

    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};
