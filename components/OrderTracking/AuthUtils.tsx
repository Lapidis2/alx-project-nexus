import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

// Define the expected shape of your JWT payload
interface JwtPayload {
  sub: string; // user id
  role: string;
  exp: number;
  iat: number;
  [key: string]: unknown; // extra fields if needed
}

export const getCookie = (name: string): string | null => {
  const value = `;${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const isVendor = (): boolean => {
  const authStateCookie = getCookie("_auth_state");
  if (authStateCookie) {
    try {
      const authState = JSON.parse(decodeURIComponent(authStateCookie));
      return authState.role === "vendor";
    } catch (error) {
      console.error("Failed to parse _auth_state cookie", error);
      return false;
    }
  }
  return false;
};

// decode JWT with strong typing
export const getToken = (): JwtPayload | null => {
  const token = Cookies.get("_auth");
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};
