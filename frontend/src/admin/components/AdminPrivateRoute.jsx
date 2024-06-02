import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout, setCredentials } from "../features/auth/adminAuthSlice";

const AdminPrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/profile`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log(data);

      if (!data.admin) {
        dispatch(logout());
        navigate("/admin/login");
      }

      console.log(data.admin);

      dispatch(setCredentials({ ...data.admin }));
    };

    checkAdmin();
  }, [dispatch]);

  return <Outlet />;
};

export default AdminPrivateRoute;
