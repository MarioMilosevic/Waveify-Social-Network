import { useUserSlice } from "../../hooks/useUserSlice";
import { Outlet, Navigate } from "react-router";
import { useEffect } from "react";
const ProtectedRoute = () => {
  const { user } = useUserSlice();

  useEffect(() => {
    /*
    does the user exist ? if not does the localStorage.getItem("jwt") exist
    if it exists 
    */
  }, []);

  return user ? <Outlet/> : <Navigate to="/login"/>
};

export default ProtectedRoute;
/*
  postoji li user u stejt?
  ako user ne postoji, postoji li token?
  ako token postoji, dohvati usera na osnovu tokena, spremi ga u stejt
  ako token i user ne postoje => navigate('login')
  
  return {children}
  <ProtectedRoute>
    <Home/>
  </ProtectedRoute>
  */
