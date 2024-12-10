import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import FullPageSpinner from "@/ui/FullPageSpinner";
import { useNetworkStatus } from "@/context/NetworkStatusContext";

function ProtectedRoutes({ children }) {

  return children ;
  const navigate = useNavigate();

  const isOffline = useNetworkStatus();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isOffline) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, isOffline, navigate]);

  if (isLoading) return <FullPageSpinner />;

  if (isAuthenticated || isOffline) return children;

  return null;
}

export default ProtectedRoutes;
