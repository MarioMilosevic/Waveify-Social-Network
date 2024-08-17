import { useUserSlice } from "../../../hooks/useUserSlice";
import { Navigate, Outlet } from "react-router";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import useFetchUserWithJWT from "../../../hooks/useFetchUserWithJWT";

const ProtectedRoute = () => {
  const { user } = useUserSlice();
  const loading = useFetchUserWithJWT();

  if (loading) return <LoadingSpinner size="big" />;

  return user?.full_name ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
