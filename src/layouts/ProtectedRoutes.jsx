import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import FullPageSpinner from "@/ui/FullPageSpinner";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <FullPageSpinner />;

  if (isAuthenticated) return children;

  return null;
}

export default ProtectedRoutes;
