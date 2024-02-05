import React from "react";

import "./ForgotPasswordScreen.css";
import { Link } from "react-router-dom";

function ForgotPasswordScreen() {
  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-heading">Forgot password</h2>
      <form className="forgot-password-form">
        <div className="form-group">
          <p>
            Enter your email address to receive a link to reset your password.
          </p>
          <input
            type="email"
            placeholder="Enter Your email..."
            id="email"
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
