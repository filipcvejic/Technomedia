import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

import "./LoginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

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
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
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
              <Link to="/forgot-password">Forgot password?</Link>
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
