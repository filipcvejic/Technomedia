import React, { useState } from "react";
import { toast } from "react-toastify";

import "./ResetPasswordScreen.css";
import { useParams } from "react-router-dom";

function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id, token } = useParams();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await fetch( 
          `http://localhost:3000/api/reset-password/${id}/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
            credentials: "include",
          }
        );

        const resData = await res.json();

        console.log(resData, "uff");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="reset-password-container">
      <h1 className="reset-password-heading">Reset password</h1>
      <form className="reset-password-form">
        <div className="form-group">
          <label htmlFor="password">
            <span>New password</span>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <span>Confirm new password</span>
          </label>
          <input
            type="password"
            id="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          ></input>
        </div>
      </form>
      <div>
        <button
          type="button"
          className="reset-button"
          onClick={resetPasswordHandler}
        >
          Set a new password
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordScreen;
