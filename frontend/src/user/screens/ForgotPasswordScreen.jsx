import React, { useState } from "react";

import "./ForgotPasswordScreen.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPasswordScreen() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-section">
        <h1 className="forgot-password-heading">Forgot password</h1>
        <form className="forgot-password-form" onSubmit={forgotPasswordHandler}>
          <div className="form-group">
            <p>
              Enter your email address to receive a link to reset your password.
            </p>
            <input
              type="email"
              placeholder="Enter Your email..."
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            ></input>
          </div>
          <div>
            <div>
              <button type="submit" className="reset-button">
                Reset my password
              </button>
            </div>
            <div className="cancel-button">
              <Link to="/login">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;
