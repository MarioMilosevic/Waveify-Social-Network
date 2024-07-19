import { useUserSlice } from "../../hooks/useUserSlice";
import { getCurrentUser } from "../../utils/helperFunction";
import { useEffect } from "react";
const ProtectedRoute = () => {
  useEffect(() => {
    const checkUser = async () => {
      const user = await getCurrentUser();
      console.log(user);
    };
    checkUser();
  }, []);
  return <div>Protected route</div>;
};

export default ProtectedRoute;
