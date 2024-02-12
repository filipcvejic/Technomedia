import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout, setCredentials } from "../../slices/adminAuthSlice";
import { toast } from "react-toastify";

const AdminPrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("http://localhost:3000/api/admin/profile");

      const resData = await res.json();

      if (!resData.admin) {
        dispatch(logout());
        navigate("/admin/login");
      } else {
        dispatch(setCredentials({ ...resData.admin }));
      }
    };

    checkUser();
  }, [dispatch, navigate]);

  return <Outlet />;
};

export default AdminPrivateRoute;
