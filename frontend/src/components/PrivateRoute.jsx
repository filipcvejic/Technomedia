import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAndRemoveUserInfo } from "../slices/authSlice";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAndRemoveUserInfo());
  }, []);

  if (!userInfo || userInfo.expiration < new Date().getTime()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
