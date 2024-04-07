import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials, setLoading } from "../features/auth/adminAuthSlice";
import { logout as userLogout } from "../../user/features/auth/userAuthSlice";
import { toast } from "react-toastify";

import "./AdminLoginScreen.css";

function AdminLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminInfo } = useSelector((state) => state.adminAuth);
  const { userInfo } = useSelector((state) => state.userAuth);
  const { isLoading } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [adminInfo]);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const response = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (userInfo) {
        dispatch(userLogout());
      }

      dispatch(setCredentials({ ...data }));
      dispatch(setLoading(false));
      navigate("/admin");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-section">
        <h1 className="admin-login-title">Admin Login</h1>
        <form className="admin-login-form" onSubmit={loginHandler}>
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
          <button className="submit-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginScreen;
