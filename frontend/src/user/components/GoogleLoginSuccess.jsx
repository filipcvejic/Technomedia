import { useEffect } from "react";
import { setCredentials } from "../../slices/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as adminLogout } from "../../slices/adminAuthSlice";
import { toast } from "react-toastify";

function GoogleLoginSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/login/success",
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        const { user } = data;
        const userInfo = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };

        if (adminInfo) {
          dispatch(adminLogout());
        }

        dispatch(setCredentials(userInfo));
        navigate("/");
      } catch (err) {
        toast.error(err?.message);
      }
    };

    checkUser();
  }, [navigate, dispatch]);
}

export default GoogleLoginSuccess;
