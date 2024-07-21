// import { useUserSlice } from "../../hooks/useUserSlice";
// import { baseUrl } from "../../utils/constants";
// import { Navigate } from "react-router";
// import { useEffect } from "react";
// const ProtectedRoute = () => {
//   const { user } = useUserSlice();
// console.log(user)

//   useEffect(() => {
//     console.log(user);
//     const getUserWithJWT = async () => {
//       const jwt = localStorage.getItem("jwt");
//       if (!jwt) return;
//       const response = await fetch(`${baseUrl}/accounts/me`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       try {
//         if (!response.ok) {
//           const { error } = await response.json();
//           console.log(error);
//           return;
//         }

//         const { account } = await response.json();

//         return account;
//       } catch (error) {
//         console.error(error);
//         throw new Error("Could not get the user");
//       }
//     };
//     getUserWithJWT();
//   }, [user]);

//   return user.full_name ? <Navigate to="/home" /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import { useUserSlice } from "../../hooks/useUserSlice";
import { baseUrl } from "../../utils/constants";
import { Navigate, Outlet } from "react-router";
import { useEffect } from "react";
import { setUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";

const ProtectedRoute = () => {
  const { user } = useUserSlice(); 
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserWithJWT = async () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
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
          return;
        }

        const { account } = await response.json();
        dispatch(setUser(account));
      } catch (error) {
        console.error(error);
      }
    };

    getUserWithJWT();
  }, [dispatch]);

 

  return user.full_name ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

// /*
//   postoji li user u stejt?
//   ako user ne postoji, postoji li token?
//   ako token postoji, dohvati usera na osnovu tokena, spremi ga u stejt
//   ako token i user ne postoje => navigate('login')
  
//   return {children}
//   <ProtectedRoute>
//     <Home/>
//   </ProtectedRoute>
//   */
