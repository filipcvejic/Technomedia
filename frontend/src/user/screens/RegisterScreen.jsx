import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials, setLoading } from "../../slices/userAuthSlice";

import "./RegisterScreen.css";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userAuth);
  const { isLoading } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        dispatch(setLoading(true));

        const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, surname, email, password }),
        });

        const resData = await res.json();
        dispatch(setLoading(false));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={registerHandler}>
        <div className="personal-data-section">
          <h2 className="section-heading">Personal Data</h2>

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
        </div>
        <div className="login-details-section">
          <h2 className="section-heading">Login Details</h2>
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
        </div>
        <div className="registration-actions">
          <button className="registration-button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
