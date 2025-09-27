import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "@/utils/auth"; // full payload helper
import { Circles } from "react-loader-spinner"; 

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Array<"admin" | "seller" | "buyer">;
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const tokenData = getUserFromToken(); // { userId, role, exp }

    if (!tokenData || !allowedRoles.includes(tokenData.role)) {
      router.replace("/auth/login");
      setIsAuthorized(false);
      return;
    }

    setIsAuthorized(true);
  }, [router, allowedRoles]);

  if (isAuthorized === null)
    return (
      <div className="flex justify-center items-center h-24">
        <Circles visible height="80" width="80" color="#C9974C" />
      </div>
    );

  if (!isAuthorized) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
