// components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAdminStore } from "../store/adminStore";
import Loading from "../components/Loading";

export default function ProtectedRoute() {
  const { authenticated, loading, isLoggedIn } = useAdminStore();

  useEffect(() => {
    isLoggedIn(); // check automatique au montage
  }, []);

  if (loading) return <Loading />;

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
