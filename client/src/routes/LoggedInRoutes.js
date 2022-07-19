import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"; // it allows u to access the elements inside another route(have a route inside another route)
import Login from "../pages/login";

const LoggedInRoutes = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Outlet/> : <Login/>
};

export default LoggedInRoutes;
