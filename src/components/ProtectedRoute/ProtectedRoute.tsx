import { useUserSlice } from "../../hooks/useUserSlice";
const ProtectedRoute = () => {
    const { user } = useUserSlice()
    console.log("iz protected route", user)
    return <div>
        <p>{user.full_name }</p>
        <img src={user.picture} alt={user.picture} />
  </div>;
};

export default ProtectedRoute;
