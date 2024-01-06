import { useState } from "react";
import { Link } from "react-router-dom";

import "./LoginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
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
