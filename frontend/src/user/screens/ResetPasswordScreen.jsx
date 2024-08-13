import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./ResetPasswordScreen.css";
import { useNavigate, useParams } from "react-router-dom";

function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/check-token/${id}/${token}`
        );

        if (!response.ok) {
          navigate("/login", { replace: true });
          const data = await response.json();
          throw new Error(data.message);
        }
      } catch (err) {
        toast.error(err?.message);
      }
    };

    checkToken();
  }, [id, token, navigate]);

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/reset-password/${id}/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
            credentials: "include",
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
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-section">
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
    </div>
  );
}

export default ResetPasswordScreen;
