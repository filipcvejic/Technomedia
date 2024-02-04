import React, { useEffect } from "react";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./slices/authSlice";
import { useCheckGoogleAuthMutation } from "./slices/usersApiSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <ToastContainer />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
