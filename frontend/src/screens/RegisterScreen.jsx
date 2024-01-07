import { useState } from "react";
import { Link } from "react-router-dom";

import "./RegisterScreen.css";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={submitHandler}>
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
              required
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
        <button className="submit-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;
