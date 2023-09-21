import {  Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/useAuth"; 
import NavBar from "./Navbar";
export const ProtectedRoute = ({redirectPath = "/login" }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return ( 
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
