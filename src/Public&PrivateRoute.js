import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const PublicRoute = () => {
  const token = useSelector((state) => state.userID);
  return token ? <Outlet /> : <Navigate to={"/"} />;
};
const PrivateRoute = () => {
  const token = useSelector((state) => state.userID);
  return !token ? <Outlet /> : <Navigate to={"/home"} />;
};
export { PrivateRoute, PublicRoute };
