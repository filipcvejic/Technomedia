import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials, setLoading } from "../features/auth/adminAuthSlice";
import { logout as userLogout } from "../../user/features/auth/userAuthSlice";
import { toast } from "react-toastify";

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
    <div className="login-container">
      <div className="login-section">
        <h2 className="login-heading">Registered users</h2>
        <p className="login-description">
          If you have an account, sign in using your email address.
        </p>

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
}

export default AdminLoginScreen;
