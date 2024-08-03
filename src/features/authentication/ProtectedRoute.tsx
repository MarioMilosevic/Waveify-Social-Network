import { useUserSlice } from "../../hooks/useUserSlice";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserInformation } from "../../utils/helperFunction";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ProtectedRoute = () => {
  const { user } = useUserSlice();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserWithJWT = async () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        return;
      } else {
        try {
          await getUserInformation(dispatch, navigate);
        } catch (error) {
          console.error("Error fetching user information:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getUserWithJWT();
  }, [dispatch, navigate]);

  if (loading) return <LoadingSpinner />;

  return user?.full_name ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
