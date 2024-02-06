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
      const res = await fetch("http://localhost:3000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const resData = await res.json();

      // if (resData.message === "Success") {
      //   toast.success("Mail sent successfully");
      // }
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="forgot-password-container">
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
  );
}

export default ForgotPasswordScreen;
