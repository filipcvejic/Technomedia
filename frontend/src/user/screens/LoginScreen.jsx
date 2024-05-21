import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setLoading } from "../features/auth/userAuthSlice";
import { syncCartProducts } from "../features/cart/cartApi";
import { logout as adminLogout } from "../../admin/features/auth/adminAuthSlice";
import { toast } from "react-toastify";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userAuth);
  const { cart } = useSelector((state) => state.userCart);
  const { adminInfo } = useSelector((state) => state.adminAuth);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(from, { replace: true });
    }
  }, [navigate, userInfo, from]);

  const googlePopupWindowHandler = async () => {
    window.open(
      "https://technomedia-5gpn.onrender.com/api/v1/login/google",
      "_self"
    );
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      try {
        dispatch(setLoading(true));

        const response = await fetch(
          "https://technomedia-5gpn.onrender.com/api/auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        if (adminInfo) {
          dispatch(adminLogout());
        }

        if (cart && Object.keys(cart).length > 0) {
          dispatch(syncCartProducts({ cartProducts: cart }));
        }

        dispatch(setCredentials({ ...data }));
        dispatch(setLoading(false));
        navigate(from, { replace: true });
      } catch (err) {
        toast.error(err?.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-section">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={loginHandler}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              className="form-input"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              className="form-input"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password">
            <Link to="/forgotpassword">Forgot password?</Link>
          </div>
          <button className="submit-button" type="submit">
            Login
          </button>
        </form>
        <div className="actions-toolbar">
          <div className="addition-actions">
            <p className="register-suggest">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
            <span className="or-option">or</span>
            <div className="external-login-container">
              <button
                className="external-login-button"
                onClick={googlePopupWindowHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="30px"
                  height="30px"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
            <span className="or-option">or</span>
            <span className="continue-as-guest">
              <Link to="/">Continue as Guest</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
