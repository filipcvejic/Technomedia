import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setLoading } from "../slices/authSlice";
import { toast } from "react-toastify";

import "./LoginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const google = async () => {
    window.open("http://localhost:5000/api/v1/login/google", "_self");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const resData = await res.json();

      dispatch(setCredentials({ ...resData }));
      dispatch(setLoading(false));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-section">
        <h2 className="login-heading">Registered users</h2>
        <p className="login-description">
          If you have an account, sign in using your email address.
        </p>

        <form className="login-form" onSubmit={submitHandler}>
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

          <div className="actions-toolbar">
            <button className="submit-button" type="submit">
              Sign In
            </button>
            <div className="forgot-password">
              <Link to="/forgotpassword">Forgot password?</Link>
            </div>
          </div>
        </form>
      </div>
      <div className="google-sign-in-container">
        <button onClick={google}>Google</button>
      </div>
      <div className="register-section">
        <h2 className="register-heading">New user</h2>
        <p className="register-description">
          Creating an account on our site is fast and free! Enjoy the benefits
          of simpler ordering and faster checkout.
        </p>
        <Link to="/register" className="register-button">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;
