import { useUserSlice } from "../../hooks/useUserSlice";
import { baseUrl } from "../../utils/constants";
import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { updateUser } from "../../utils/helperFunction";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ProtectedRoute = () => {
  const { user } = useUserSlice();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserWithJWT = async () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/accounts/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (!response.ok) {
          const { error } = await response.json();
          console.log(error);
          setLoading(false);
          return;
        }

        const { account } = await response.json();
        const updatedAccount = updateUser(account);
        console.log("testiram ", updatedAccount);
        dispatch(setUser(updatedAccount));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getUserWithJWT();
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;

  return user?.full_name ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
