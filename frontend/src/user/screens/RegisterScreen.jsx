import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "../features/auth/userAuthSlice";

import "./RegisterScreen.css";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userAuth);
  const { isLoading } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const googlePopupWindowHandler = async () => {
    window.open(`${import.meta.env.VITE_API_URL}/api/v1/login/google`, "_self");
  };

  const agreeHandler = () => {
    setAgree((prevValue) => !prevValue);
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (
      name !== "" &&
      surname !== "" &&
      email !== "" &&
      password !== "" &&
      confirmedPassword !== "" &&
      agree
    ) {
      if (password !== confirmedPassword) {
        toast.error("Passwords do not match");
      } else {
        try {
          dispatch(setLoading(true));

          const response = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name, surname, email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message);
          }

          toast.warn(data.message);
          dispatch(setLoading(false));
          navigate("/login");
        } catch (err) {
          toast.error(err?.message);
        }
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-section">
        <h1 className="register-heading">Register</h1>
        <form className="register-form" onSubmit={registerHandler}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              First Name
            </label>
            <input
              id="name"
              className="form-input"
              type="text"
              placeholder="Enter First Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname" className="form-label">
              Last Name
            </label>
            <input
              id="surname"
              className="form-input"
              type="text"
              placeholder="Enter Last Name"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
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
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              className="form-input"
              type="password"
              placeholder="Confirm Password"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              required
            />
          </div>
          <div className="agreement">
            <input
              type="checkbox"
              onChange={agreeHandler}
              checked={agree}
              required
            />
            <label className="field-info" htmlFor="agreement">
              I agree to the <Link to="/terms-of-use">Terms of use</Link>
            </label>
          </div>
          <button className="submit-button" type="submit">
            Register
          </button>
        </form>
        <div className="actions-toolbar">
          <div className="addition-actions">
            <span className="login-suggest">
              Already have an account? <Link to="/login">Sign in</Link>
            </span>
            <span className="or-option">or</span>
            <div className="external-register-container">
              <button
                className="external-register-button"
                onClick={googlePopupWindowHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="30px"
                  height="30px"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
