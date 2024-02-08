import React, { useEffect } from "react";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function GoogleLoginSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("http://localhost:3000/api/v1/login/success", {
        credentials: "include",
      });
      const resData = await res.json();
      const { user } = resData;
      const userInfo = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
      dispatch(setCredentials(userInfo));
      navigate("/");
    };

    checkUser();
  }, [navigate, dispatch]);
}

export default GoogleLoginSuccess;
